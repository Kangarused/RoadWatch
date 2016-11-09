using System.Threading.Tasks;
using RoadWatch.Common.IocAttributes;
using RoadWatch.Common.Model;
using RoadWatch.Common.Providers;
using RoadWatch.Private.Providers;
using Newtonsoft.Json;
using ServiceStack.OrmLite;

namespace RoadWatch.Private.Database.OrmLiteInfrastructure
{
    public interface IAuditProvider
    {
        Task PersistsAuditInfoAsync(DatabaseOperationType operationType, IAuditTrailable entity);
    }
    [PerRequest]
    public class AuditProvider : IAuditProvider
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IDateResolver _dateResolver;
        private readonly IUserResolver _userResolver;

        public AuditProvider(IUnitOfWork unitOfWork, IDateResolver dateResolver, IUserResolver userResolver)
        {
            _unitOfWork = unitOfWork;
            _dateResolver = dateResolver;
            _userResolver = userResolver;
        }

        public async Task PersistsAuditInfoAsync(DatabaseOperationType operationType, IAuditTrailable entity)
        {
            var userDetails = _userResolver.GetUser();
            var audit = new Audit
            {
                DateTime = _dateResolver.Now(),
                EntityType = entity.GetType().Name,
                Ip = userDetails.IpAddress,
                Key = entity.Id,
                Operation = operationType.ToString(),
                Serialised = JsonConvert.SerializeObject(entity),
                TransactionId = _unitOfWork.TransactionId,
                User = userDetails.Email
            };
            await _unitOfWork.Db.InsertAsync(audit);
        }
    }
}