using RoadWatch.Common.IocAttributes;
using RoadWatch.Common.Model;
using RoadWatch.Common.Providers;
using RoadWatch.Private.Database.OrmLiteInfrastructure;

namespace RoadWatch.Private.Database.Repositories
{
    public interface IUserCredentialRepository : IAbstractRepository<UserCredential>
    {

    }

    [PerRequest]
    public class UserCredentialRepository : AbstractRepository<UserCredential>, IUserCredentialRepository
    {
        public UserCredentialRepository(IUnitOfWork unitOfWork, IDateResolver dateResolver, IAuditProvider auditProvider) : base(unitOfWork, dateResolver, auditProvider)
        {
        }
    }
}