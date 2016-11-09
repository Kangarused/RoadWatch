using System;
using RoadWatch.Common.Model;
using T4TS;

namespace RoadWatch.Common.Dtos
{
    [TypeScriptInterface]
    public class PublicReportFilterRequest : PagingFilter
    {
        // Condition Filters
        public RoadConditionTypes? RoadConditionType { get; set; }
        public string ConditionType { get; set; }

        // Location Filters
        public string Area { get; set; }
        public string Road { get; set; }

        // Date Filters
        public DateTime? Date { get; set; }

        //Comment Filters
        public string AdditionalInformation { get; set; }
    }
}
