using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using RoadWatch.Common.Dtos;
using RoadWatch.Common.IocAttributes;
using RoadWatch.Common.Model;
using RoadWatch.Common.Providers;
using RoadWatch.Private.Database.OrmLiteInfrastructure;
using ServiceStack.OrmLite;

namespace RoadWatch.Private.Database.Repositories
{
    public interface IAnnouncementRepository : IAbstractRepository<Announcement>
    {
        Task<List<Announcement>> GetPagedAnnouncements(AnnouncementFilter filter, out int recordCount);
    }

    [PerRequest]
    public class AnnouncementRepository : AbstractRepository<Announcement>, IAnnouncementRepository
    {
        public AnnouncementRepository(IUnitOfWork unitOfWork, IDateResolver dateResolver, IAuditProvider auditProvider) : base(unitOfWork, dateResolver, auditProvider)
        {
        }

        public Task<List<Announcement>> GetPagedAnnouncements(AnnouncementFilter filter, out int recordCount)
        {
            var query = Db.From<Announcement>();

            if (!string.IsNullOrEmpty(filter.Title))
            {
                query.Where(i => i.Title.Contains(filter.Title));
            }

            if (!string.IsNullOrEmpty(filter.Content))
            {
                query.Where(i => i.Content.Contains(filter.Content));
            }

            if (filter.InitialDate.HasValue )
            {
                query.Where(i => i.CreatedTime >= filter.InitialDate.Value);
            }

            if (filter.FinalDate.HasValue)
            {
                query.Where(i => i.CreatedTime <= filter.FinalDate.Value);
            }

            recordCount = (int)Db.Count(query);

            return Db.SelectAsync(query.ApplyPaging(filter, x => x.CreatedTime, true));
        }
    }
}