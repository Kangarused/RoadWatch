using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using RoadWatch.Common.IocAttributes;
using RoadWatch.Common.Model;
using RoadWatch.Common.Providers;
using RoadWatch.Private.Database.OrmLiteInfrastructure;
using ServiceStack.OrmLite;

namespace RoadWatch.Private.Database.Repositories
{
    public interface IAuthClientRepository : IAbstractRepository<AuthClient>
    {
        Task<AuthClient> GetAuthClientByName(string name);
    }

    [PerRequest]
    public class AuthClientRepository : AbstractRepository<AuthClient>, IAuthClientRepository
    {
        public AuthClientRepository(IUnitOfWork unitOfWork, IDateResolver dateResolver, IAuditProvider auditProvider) : base(unitOfWork, dateResolver, auditProvider)
        {
        }

        public async Task<AuthClient> GetAuthClientByName(string name)
        {
            var query = Db.From<AuthClient>()
                .Where(i => i.Name == name);

            var results = await Db.SelectAsync(query);
            return results.SingleOrDefault();
        }
    }
}