using System.Threading.Tasks;
using System.Web.Http;
using RoadWatch.Common.Dtos;
using RoadWatch.Common.Model;
using RoadWatch.Public.Providers;

namespace RoadWatch.Public.Controllers
{
    public class AnnouncementController : ApiController
    {
        private readonly IPrivateApiProvider _privateApiProvider;

        public AnnouncementController(IPrivateApiProvider privateApiProvider)
        {
            _privateApiProvider = privateApiProvider;
        }

        [AcceptVerbs("POST")]
        public async Task<PagedResponse<Announcement>> GetPagedAnnouncements(AnnouncementFilter filter)
        {
            var results = await _privateApiProvider.InvokePostAsync<PagedResponse<Announcement>>("Announcement", "GetPagedAnnouncements", filter);
            return results;
        }
    }
}