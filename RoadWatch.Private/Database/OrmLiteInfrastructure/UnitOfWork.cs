using System;
using System.Data;
using RoadWatch.Common.IocAttributes;
using RoadWatch.Common.Providers;
using ServiceStack.OrmLite;
using ServiceStack.OrmLite.SqlServer;
using ServiceStack.OrmLite.MySql;

namespace RoadWatch.Private.Database.OrmLiteInfrastructure
{
    public interface IUnitOfWork : IDisposable
    {
        /// <summary>
        /// Call this to commit the unit of work
        /// </summary>
        void Commit();

        /// <summary>
        /// Return the database reference for this UOW
        /// </summary>
        IDbConnection Db { get; }

        /// <summary>
        /// Starts a transaction on this unit of work
        /// </summary>
        void StartTransaction();

        int? TransactionId { get; }
    }

    [PerRequest]
    public class UnitOfWork : IUnitOfWork
    {
        private IDbTransaction _transaction;
        private readonly IDbConnection _db;


        public UnitOfWork(IConfigurationManagerProvider settingsProvider)
        {
            //Used for SQL Server 2012 Connection
            //var factory = new OrmLiteConnectionFactory(settingsProvider.GetConnectionString(), new SqlServer2012OrmLiteDialectProvider());

            //User for MySql Connection
            var factory = new OrmLiteConnectionFactory(settingsProvider.GetConnectionString(), new MySqlDialectProvider());
            _db = factory.Open();
        }

        public void Dispose()
        {
            if (_transaction != null)
            {
                _transaction.Rollback();
                _transaction = null;
            }
            Db.Close();
            Db.Dispose();
        }

        public void StartTransaction()
        {
            _transaction = Db.OpenTransaction(IsolationLevel.ReadUncommitted);
        }

        
        public void Commit()
        {
            _transaction.Commit();
            _transaction.Dispose();
            _transaction = null;
        }

        public IDbConnection Db => _db;


        public int? TransactionId
        {
            get
            {
                if (_transaction != null)
                {
                    return _transaction.GetHashCode();
                }
                return null;
            }
        }
    }
}
