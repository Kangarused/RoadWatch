using System.Collections.Generic;
using System.Threading.Tasks;
using RoadWatch.Common.Dtos;
using RoadWatch.Common.IocAttributes;
using RoadWatch.Common.Model;
using RoadWatch.Common.Providers;
using RoadWatch.Private.Database.OrmLiteInfrastructure;
using ServiceStack.OrmLite;

namespace RoadWatch.Private.Database.Repositories
{
    public interface IPublicReportRepository : IAbstractRepository<PublicReport>
    {
        Task<List<PublicReport>> GetPagedReports(PublicReportFilterRequest filter, out int recordCount);
    }

    [PerRequest]
    public class PublicReportRepository : AbstractRepository<PublicReport>, IPublicReportRepository 
    {
        public PublicReportRepository(IUnitOfWork unitOfWork, IDateResolver dateResolver, IAuditProvider auditProvider) : base(unitOfWork, dateResolver, auditProvider)
        {
        }

        public Task<List<PublicReport>> GetPagedReports(PublicReportFilterRequest filter, out int recordCount)
        {
            var query = Db.From<PublicReport>();

            if (filter.RoadConditionType.HasValue)
            {
                query.Where(i => i.RoadConditionType == filter.RoadConditionType.ToString());
            }

            if (!string.IsNullOrEmpty(filter.ConditionType))
            {
                query.Where(i => i.Condition.Contains(filter.ConditionType));
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
                query.Where(i => i.ReportDate == filter.Date.Value);
            }

            if (filter.AdditionalInformation != null)
            {
                query.Where(i => i.AdditionalInformation.Contains(filter.AdditionalInformation));
            }

            recordCount = (int)Db.Count(query);

            return Db.SelectAsync(query.ApplyPaging(filter, x => x.ReportDate, true));
        } 
    }
}