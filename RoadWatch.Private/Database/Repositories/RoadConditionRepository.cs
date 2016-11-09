using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RoadWatch.Common.Dtos;
using RoadWatch.Common.IocAttributes;
using RoadWatch.Common.Model;
using RoadWatch.Common.Providers;
using RoadWatch.Private.Database.OrmLiteInfrastructure;
using ServiceStack.OrmLite;

namespace RoadWatch.Private.Database.Repositories
{
    public interface IRoadConditionRepository : IAbstractRepository<RoadCondition>
    {
        Task<List<MapObject>> GetAllMapObjects();
        Task<int> GetIdByMarkerId(int markerId);
        Task<List<RoadCondition>> GetPagedReports(RoadConditionReportFilter filter, out int recordCount);
    }

    [PerRequest]
    public class RoadConditionRepository : AbstractRepository<RoadCondition>, IRoadConditionRepository
    {
        public RoadConditionRepository(IUnitOfWork unitOfWork, IDateResolver dateResolver, IAuditProvider auditProvider) : base(unitOfWork, dateResolver, auditProvider)
        {
        }

        public async Task<List<MapObject>> GetAllMapObjects()
        {
            var select = Db.From<RoadCondition>().Select(x => x.MapObject);
            var results = await Db.ColumnAsync<MapObject>(select);
            return results;
        }

        public async Task<int> GetIdByMarkerId(int markerId)
        {
            var query = Db.From<RoadCondition>().Where(x => x.MarkerId == markerId);
            var results = await Db.SelectAsync(query);

            var objId = results.FirstOrDefault();
            return objId?.Id ?? 0;
        }

        public Task<List<RoadCondition>> GetPagedReports(RoadConditionReportFilter filter, out int recordCount)
        {
            var query = Db.From<RoadCondition>();

            if (filter.RoadConditionType.HasValue)
            {
                query.Where(i => i.RoadConditionType == filter.RoadConditionType.ToString());
            }

            if (!string.IsNullOrEmpty(filter.Condition))
            {
                query.Where(i => i.Condition.Contains(filter.Condition));
            }

            if (!string.IsNullOrEmpty(filter.Road))
            {
                query.Where(i => i.Road.Contains(filter.Road));
            }

            if (!string.IsNullOrEmpty(filter.Area))
            {
                query.Where(i => i.Area.Contains(filter.Area));
            }

            if (filter.Date.HasValue)
            {
                var nextDay = filter.Date.Value.AddDays(1);
                query.Where(i => i.ModifiedTime.Date >= filter.Date.Value);
                query.Where(i => i.ModifiedTime.Date <= nextDay);
            }

            recordCount = (int)Db.Count(query);

            return Db.SelectAsync(query.ApplyPaging(filter, x => x.ModifiedTime, true));
        }
    }
}