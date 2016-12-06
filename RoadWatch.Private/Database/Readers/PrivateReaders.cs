using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RoadWatch.Common.Dtos;
using RoadWatch.Common.IocAttributes;
using RoadWatch.Common.Model;
using RoadWatch.Private.Database.OrmLiteInfrastructure;
using ServiceStack.OrmLite;

namespace RoadWatch.Private.Database.Readers
{
    public interface IPrivateReader
    {
        Task<long> GetDatabaseVersion();
    }
    [PerRequest]
    public class PrivateReader : AbstractReader, IPrivateReader
    {
        public PrivateReader(IUnitOfWork unitOfWork) : base(unitOfWork)
        {

        }

        public async Task<long> GetDatabaseVersion()
        {
            var query = Db.From<VersionInfo>().OrderByDescending(i => i.Version);
            var results = await Db.SelectAsync(query);
            return results.First().Version;
        }
    }

}