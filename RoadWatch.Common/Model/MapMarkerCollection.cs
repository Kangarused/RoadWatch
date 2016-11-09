using System.Collections.Generic;
using T4TS;

namespace RoadWatch.Common.Model
{
    [TypeScriptInterface]
    public class MapMarkerTile
    {
        public int Id { get; set; }
        public RoadConditionTypes RoadConditionType { get; set; }
        public CollisionTypes? CollisionType { get; set; }
        public HazardTypes? HazardType { get; set; }
        public string FilePath { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Color { get; set; }
        public string ModalClass { get; set; }
    }
}
