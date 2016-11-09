using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
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
