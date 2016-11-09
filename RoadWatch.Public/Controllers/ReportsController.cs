using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;
using RoadWatch.Common.Dtos;
using RoadWatch.Common.Model;
using RoadWatch.Public.Providers;

namespace RoadWatch.Public.Controllers
{
    public class ReportsController : ApiController
    {
        private readonly IPrivateApiProvider _privateApiProvider;

        public ReportsController(IPrivateApiProvider privateApiProvider)
        {
            _privateApiProvider = privateApiProvider;
        }

        [AcceptVerbs("POST")]
        public async Task<ActionResponseGeneric<string>> SavePublicReport(PublicReport request)
        {
            var objects = await _privateApiProvider.InvokePostAsync<ActionResponseGeneric<string>>("Reports", "SavePublicReport", request);
            return objects;
        }

        [AcceptVerbs("POST")]
        public async Task<PagedResponse<RoadConditionReport>> GetPagedRoadReports(RoadConditionReportFilter request)
        {
            var objects = await _privateApiProvider.InvokePostAsync<PagedResponse<RoadConditionReport>>("Reports", "GetPagedRoadReports", request);
            return objects;
        }
    }
}