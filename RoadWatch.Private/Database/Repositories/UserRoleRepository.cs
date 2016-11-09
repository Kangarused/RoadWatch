using System.Collections.Generic;
using System.Threading.Tasks;
using RoadWatch.Common.IocAttributes;
using RoadWatch.Common.Model;
using RoadWatch.Common.Providers;
using RoadWatch.Private.Database.OrmLiteInfrastructure;
using ServiceStack.OrmLite;

namespace RoadWatch.Private.Database.Repositories
{
    public interface IUserRoleRepository : IAbstractRepository<UserRole>
    {
        Task<List<UserRole>> GetAllRolesByUserId(int userId);
    }

    [PerRequest]
    public class UserRoleRepository : AbstractRepository<UserRole>, IUserRoleRepository
    {
        public UserRoleRepository(IUnitOfWork unitOfWork, IDateResolver dateResolver, IAuditProvider auditProvider) : base(unitOfWork, dateResolver, auditProvider)
        {
        }

        public async Task<List<UserRole>> GetAllRolesByUserId(int userId)
        {
            var query = Db.From<UserRole>()
                .Where(i => i.UserId == userId);

            var results = await Db.LoadSelectAsync(query);
            return results;
        }
    }
}