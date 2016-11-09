using System;
using RoadWatch.Common.Model;
using T4TS;

namespace RoadWatch.Common.Dtos
{
    [TypeScriptInterface]
    public class RoadConditionReportFilter : PagingFilter
    {
        public RoadConditionTypes? RoadConditionType { get; set; }
        public string Condition { get; set; }
        public string Road { get; set; }
        public string Area { get; set; }
        public DateTime? Date { get; set; }
    }
}