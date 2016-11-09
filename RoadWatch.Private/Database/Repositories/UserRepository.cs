using System.Linq;
using System.Threading.Tasks;
using RoadWatch.Common.IocAttributes;
using RoadWatch.Common.Model;
using RoadWatch.Common.Providers;
using RoadWatch.Private.Database.OrmLiteInfrastructure;
using ServiceStack.OrmLite;

namespace RoadWatch.Private.Database.Repositories
{
    public interface IUserRepository : IAbstractRepository<User>
    {
        Task<User> LoadByEmailAsync(string email);
    }

    [PerRequest]
    public class UserRepository : AbstractRepository<User>, IUserRepository
    {
        public UserRepository(IUnitOfWork unitOfWork, IDateResolver dateResolver, IAuditProvider auditProvider) : base(unitOfWork, dateResolver, auditProvider)
        {
        }

        public async Task<User> LoadByEmailAsync(string email)
        {
            var query = Db.From<User>()
                .Where(i => i.Email == email);

            var results = await Db.LoadSelectAsync(query);
            return results.SingleOrDefault();
        }
    }
}