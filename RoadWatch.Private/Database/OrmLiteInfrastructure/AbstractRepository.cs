﻿using System;
using System.Collections.Generic;
using System.Data;
using System.Linq.Expressions;
using System.Threading.Tasks;
using RoadWatch.Common.Model;
using RoadWatch.Common.Providers;
using RoadWatch.Common.Providers.Logging;
using RoadWatch.Private.Providers;
using ServiceStack.OrmLite;
using ServiceStack.Model;

namespace RoadWatch.Private.Database.OrmLiteInfrastructure
{
    public interface IAbstractRepository<T>
    {
        /// <summary>
        /// Warning This is only supposed to be used when return list is small, if expected return list is big then use paging
        /// </summary>
        /// <returns>A list of all T objects in the persistent store</returns>
        Task<List<T>> GetAllAsync();
        Task<T> GetByIdAsync(int id);
        Task<T> LoadByIdAsync(int id);
        Task<T> SaveAsync(T entity);
        Task<T> SaveAsync(T entity, bool auditLogEnabled);
        Task<long> InsertAsync(T entity);
        Task<long> InsertAsync(T entity, bool auditLogEnabled);
        Task UpdateAsync(T entity);
        Task UpdateAsync(T entity, bool auditLogEnabled);
        Task UpdateAllAsync(IList<T> entities, bool auditLogEnabled);
        Task DeleteAsync(Expression<Func<T,bool>> expression, bool auditLogEnabled);
        Task DeleteAsync(Expression<Func<T,bool>> expression);
        int? TransactionId { get; }
    }
    public class AbstractRepository<T> : IAbstractRepository<T> where T : IHasId<int>, new()
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IDateResolver _dateResolver;
        private readonly IAuditProvider _auditProvider;

        public DateTime Now
        {
            get
            {
                return _dateResolver.Now();
            }
        }

        public ILoggingProvider Logger
        {
            get; set;
        }

        //Optional resolver injected by IOC container
        public IUserResolver CurrentUserProvider { get; set; }

        public AbstractRepository(IUnitOfWork unitOfWork, IDateResolver dateResolver, IAuditProvider auditProvider)
        {
            if (unitOfWork == null) throw new ArgumentNullException("unitOfWork");
            
            _unitOfWork = unitOfWork;
            _dateResolver = dateResolver;
            _auditProvider = auditProvider;
        }

        protected  IDbConnection Db
        {
            get { return _unitOfWork.Db; }
        }

        private void ApplyTimeStamp(IEntityWithTimeStamp entity, bool isInsert)
        {
            if (isInsert)
            {
                entity.CreatedTime = _dateResolver.Now();
            }
            entity.ModifiedTime = _dateResolver.Now();
        }

        protected string GetCurrentUserName()
        {
            var name = "Anonymous";
            if (CurrentUserProvider != null)
            {
                var user = CurrentUserProvider.GetUser();
                name = user.Email;
            }
            return name;
        }

        private void ApplyAuditInfo(IEntityWithAudit entity, bool isInsert)
        {
            var name = GetCurrentUserName();
            
            entity.ModifiedBy = name;
            if (isInsert)
            {
                entity.CreatedBy = name;
            }
        }

        public Task<List<T>> GetAllAsync()
        {
            var q = Db.From<T>();
            return Db.SelectAsync(q);
        }

        public virtual Task<T> GetByIdAsync(int id)
        {
            return Db.SingleByIdAsync<T>(id);
        }

        public Task<T> LoadByIdAsync(int id)
        {
            return Db.LoadSingleByIdAsync<T>(id);
        }

        public virtual async Task<T> SaveAsync(T entity)
        {
            return await SaveAsync(entity, true);
        }

        public virtual async Task<T> SaveAsync(T entity, bool auditLogEnabled)
        {
            var stamp = entity as IEntityWithTimeStamp;
            if (stamp != null)
            {
                ApplyTimeStamp(stamp, true);
            }

            var audit = entity as IEntityWithAudit;
            if (audit != null)
            {
                ApplyAuditInfo(audit, true);
            }

            var newEntity = entity.Id == 0;

            await _unitOfWork.Db.SaveAsync(entity);

            if (auditLogEnabled)
            {
                var trailable = entity as IAuditTrailable;
                if (trailable != null)
                {
                    trailable.Id = entity.Id;
                    DatabaseOperationType operationType = newEntity ? DatabaseOperationType.Create : DatabaseOperationType.Update;
                    await _auditProvider.PersistsAuditInfoAsync(operationType, trailable);
                }
            }

            return entity;
        }

        public virtual async Task<long> InsertAsync(T entity)
        {
            return await InsertAsync(entity, true);
        }

        public virtual async Task<long> InsertAsync(T entity, bool auditLogEnabled)
        {
            var stamp = entity as IEntityWithTimeStamp;
            if (stamp != null)
            {
                ApplyTimeStamp(stamp, true);
            }

            var audit = entity as IEntityWithAudit;
            if (audit != null)
            {
                ApplyAuditInfo(audit, true);
            }

            if (auditLogEnabled)
            {
                var trailable = entity as IAuditTrailable;
                if (trailable != null)
                {
                    await _auditProvider.PersistsAuditInfoAsync(DatabaseOperationType.Create, trailable);
                }
            }

            var id = await _unitOfWork.Db.InsertAsync(entity, selectIdentity: true);
            return id;
        }
       
        public virtual Task DeleteAsync(Expression<Func<T,bool>> expression)
        {
            return DeleteAsync(expression, true);
        }

        public async Task DeleteAsync(Expression<Func<T,bool>> expression, bool auditLogEnabled)
        {
            List<Task> tasks = new List<Task>();
            if (auditLogEnabled)
            {
                if (typeof(IAuditTrailable).IsAssignableFrom(typeof(T)))
                {
                    var query = Db.From<T>().Where(expression);
                    var results = await Db.SelectAsync(query);
                    foreach (IAuditTrailable result in results)
                    {
                        tasks.Add(_auditProvider.PersistsAuditInfoAsync(DatabaseOperationType.Delete, result));
                    }
                }
            }

            tasks.Add(_unitOfWork.Db.DeleteAsync(expression));
            await Task.WhenAll(tasks);
        }

        public virtual Task UpdateAsync(T entity)
        {
            return UpdateAsync(entity, true);
        }

        public virtual async Task UpdateAsync(T entity, bool auditLogEnabled)
        {
            if (auditLogEnabled)
            {
                //Do not log changes
                var stamp = entity as IEntityWithTimeStamp;
                if (stamp != null)
                {
                    ApplyTimeStamp(stamp, false);
                }

                var audit = entity as IEntityWithAudit;
                if (audit != null)
                {
                    ApplyAuditInfo(audit, false);
                }
            }

            List<Task> tasks = new List<Task>();
            tasks.Add(_unitOfWork.Db.UpdateAsync(entity));

            if (auditLogEnabled)
            {
                var trailable = entity as IAuditTrailable;
                if (trailable != null)
                {
                    tasks.Add(_auditProvider.PersistsAuditInfoAsync(DatabaseOperationType.Update, trailable)); 
                }
            }

            await Task.WhenAll(tasks);
        }

        public virtual async Task UpdateAllAsync(IList<T> entities, bool auditLogEnabled)
        {
            if (auditLogEnabled)
            {
                //Do not log changes
                foreach (var entity in entities)
                {
                    var stamp = entity as IEntityWithTimeStamp;
                    if (stamp != null)
                    {
                        ApplyTimeStamp(stamp, false);
                    }

                    var audit = entity as IEntityWithAudit;
                    if (audit != null)
                    {
                        ApplyAuditInfo(audit, false);
                    }
                }
            }

            List<Task> tasks = new List<Task>();
            tasks.Add(_unitOfWork.Db.UpdateAllAsync(entities));

            if (auditLogEnabled)
            {
                foreach (var entity in entities)
                {
                    var trailable = entity as IAuditTrailable;
                    if (trailable != null)
                    {
                        tasks.Add(_auditProvider.PersistsAuditInfoAsync(DatabaseOperationType.Update, trailable));
                    }
                }
            }
            await Task.WhenAll(tasks);
        }

        public int? TransactionId => _unitOfWork.TransactionId;
    }
}
