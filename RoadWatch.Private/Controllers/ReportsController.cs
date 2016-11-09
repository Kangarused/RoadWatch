using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using Newtonsoft.Json;
using RoadWatch.Common.Dtos;
using RoadWatch.Common.Model;
using RoadWatch.Private.Database.Repositories;
using RoadWatch.Private.Models.Validators;
using RoadWatch.Private.Providers;

namespace RoadWatch.Private.Controllers
{
    public class ReportsController : ApiController
    {
        private readonly IPublicReportRepository _publicReportRepository;
        private readonly IRoadConditionRepository _roadConditionRepository;
        private readonly ISignalrHubProvider _signalrHubProvider;

        public ReportsController(IPublicReportRepository publicReportRepository, 
            IRoadConditionRepository roadConditionRepository,
            ISignalrHubProvider signalrHubProvider)
        {
            _publicReportRepository = publicReportRepository;
            _roadConditionRepository = roadConditionRepository;
            _signalrHubProvider = signalrHubProvider;
        }

        [AcceptVerbs("POST")]
        public async Task<PagedResponse<PublicReport>> GetPagedPublicReports(PublicReportFilterRequest filter)
        {
            int recordCount;
            var reports = await _publicReportRepository.GetPagedReports(filter, out recordCount);

            return new PagedResponse<PublicReport>
            {
                Items = reports,
                NumRecords = recordCount
            };
        }

        [AcceptVerbs("POST")]
        public async Task<PagedResponse<RoadConditionReport>> GetPagedRoadReports(RoadConditionReportFilter request)
        {
            int recordCount;
            var results = await _roadConditionRepository.GetPagedReports(request, out recordCount);
            List<RoadConditionReport> reports = new List<RoadConditionReport>();

            foreach (var item in results)
            {
                RoadConditionReport report = new RoadConditionReport()
                {
                    RoadConditionType = item.RoadConditionType,
                    Condition = item.Condition,
                    ConditionEffects = JsonConvert.DeserializeObject<List<ConditionEffect>>(item.ConditionEffects),
                    Road = item.Road,
                    Area = item.Area,
                    AdditionalInformation = item.AdditionalInformation,
                    ModifiedTime = item.ModifiedTime
                };

                reports.Add(report);
            }

            return new PagedResponse<RoadConditionReport>()
            {
                Items = reports,
                NumRecords = recordCount
            };
        }

        [AcceptVerbs("POST")]
        public async Task<ActionResponseGeneric<string>> SavePublicReport(PublicReport request)
        {
            var validator = new PublicReportValidator();
            var results = validator.Validate(request);

            if (!results.IsValid)
            {
                return new ActionResponseGeneric<string>
                {
                    Succeed = false,
                    Response = "Public Report did not validate, please fill in the required fields"
                };
            }

            request.ReportDate = DateTime.Now;
            var id = await _publicReportRepository.InsertAsync(request);
            _signalrHubProvider.PublicReportsUpdated();
            return new ActionResponseGeneric<string>
            {
                Succeed = true,
                Response = "Your report was successfully registered, thank you!"
            };
        }
    }
}