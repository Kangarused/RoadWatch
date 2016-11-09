using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using RoadWatch.Common.Dtos;
using RoadWatch.Common.Model;
using RoadWatch.Private.Database.Repositories;
using RoadWatch.Private.Models.Validators;
using RoadWatch.Private.Providers;
using RoadWatch.Private.WebApiFilters;

namespace RoadWatch.Private.Controllers
{
    public class AnnouncementController : ApiController
    {
        private readonly IAnnouncementRepository _announcementRepository;
        private readonly ISignalrHubProvider _signalrHubProvider;

        public AnnouncementController(IAnnouncementRepository announcementRepository, 
            ISignalrHubProvider signalrHubProvider)
        {
            _announcementRepository = announcementRepository;
            _signalrHubProvider = signalrHubProvider;
        }

        [AcceptVerbs("POST")]
        public async Task<PagedResponse<Announcement>> GetPagedAnnouncements(AnnouncementFilter filter)
        {
            int recordCount;
            var results = await _announcementRepository.GetPagedAnnouncements(filter, out recordCount);

            return new PagedResponse<Announcement>()
            {
                Items = results,
                NumRecords = recordCount
            };
        }

        [AcceptVerbs("POST")]
        [AuthorizeAccess(Role.SystemAdministrator)]
        public async Task<ActionResponseGeneric<string>> SaveAnnouncement(Announcement announcement)
        {
            var validator = new AnnouncementValidator();
            var result = validator.Validate(announcement);
            
            if (!result.IsValid)
            {
                return new ActionResponseGeneric<string>()
                {
                    Succeed = false,
                    Response = "Please supply both title and content for the announcement"
                };
            }

            var response = "";
            bool newAnnouncement = announcement.Id == 0;
            await _announcementRepository.SaveAsync(announcement);

            if (newAnnouncement)
            {
                response = "Announcement was successfully created";
            }
            else
            {
                response = "Announcement was successfully updated";
            }

            _signalrHubProvider.AnnouncementsUpdated();
            return new ActionResponseGeneric<string>()
            {
                Succeed = true,
                Response = response
            };
        }

        [AcceptVerbs("POST")]
        [AuthorizeAccess(Role.SystemAdministrator)]
        public async Task<ActionResponseGeneric<string>> DeleteAnnouncement(Announcement announcement)
        {
            await _announcementRepository.DeleteAsync(x => x.Id == announcement.Id);
            _signalrHubProvider.AnnouncementsUpdated();
            return new ActionResponseGeneric<string>()
            {
                Succeed = true,
                Response = "Announcement was successfully deleted"
            };
        }
    }
}