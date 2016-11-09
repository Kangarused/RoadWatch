using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using T4TS;

namespace RoadWatch.Common.Model
{
    [TypeScriptInterface]
    public class RoadConditionReport
    {
        public string RoadConditionType { get; set; }
        public string Condition { get; set; }
        public List<ConditionEffect> ConditionEffects { get; set; }
        public string Road { get; set; }
        public string Area { get; set; }
        public string AdditionalInformation { get; set; }
        public DateTime ModifiedTime { get; set; }
    }
}
