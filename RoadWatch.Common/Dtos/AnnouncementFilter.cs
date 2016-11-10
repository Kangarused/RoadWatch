using System;
using RoadWatch.Common.Model;
using T4TS;

namespace RoadWatch.Common.Dtos
{
    [TypeScriptInterface]
    public class AnnouncementFilter : PagingFilter
    {
        public string Title { get; set; }
        public string Content { get; set; }
        public DateTime? InitialDate { get; set; }
        public DateTime? FinalDate { get; set; }
    }
}
