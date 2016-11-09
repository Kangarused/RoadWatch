using System.Collections.Generic;
using T4TS;

namespace RoadWatch.Common.Model
{
    [TypeScriptInterface]
    public class MapObjectCollection
    {
        public List<MapObject> Collection { get; set; }
    }

    [TypeScriptInterface]
    public class MapObject
    {
        public int Id { get; set; }
        public Marker Marker { get; set; }

        //Marker Information
        public RoadConditionTypes RoadConditionType { get; set; }
        public string Condition { get; set; }
        public string Duration { get; set; }
        public List<ConditionEffect> ConditionEffects { get; set; }
        public string AdditionalInformation { get; set; }

        // Location Information
        public string Area { get; set; }
        public string Road { get; set; }

        public List<MapPath> Paths { get; set; }
    }

    [TypeScriptInterface]
    public class ConditionEffect
    {
        public ConditionEffectTypes Effect { get; set; }
    }

    [TypeScriptInterface]
    public class Marker
    {
        public int Id { get; set; }
        public LatLng Coords { get; set; }
        public MarkerOptions Options { get; set; }
        public object WindowOptions { get; set; }
    }

    [TypeScriptInterface]
    public class MarkerOptions
    {
        public Icon Icon { get; set; }
        public bool Draggable { get; set; }
    }

    [TypeScriptInterface]
    public class Icon
    {
        public string Url { get; set; }
        public Size ScaledSize { get; set; }
    }

    [TypeScriptInterface]
    public class Size
    {
        public int Width { get; set; }
        public int Height { get; set; }
    }

    [TypeScriptInterface]
    public class MapPath
    {
        public string Id { get; set; }
        public bool Visible { get; set; }
        public bool Editable { get; set; }
        public bool Clickable { get; set; }
        public bool Draggable { get; set; }
        public bool Static { get; set; }
        public Stroke Stroke { get; set; }
        public WindowOptions WindowOptions { get; set; }
        public LatLng[] Path { get; set; }
    }

    [TypeScriptInterface]
    public class WindowOptions
    {
        public bool Visible { get; set; }
    }

    [TypeScriptInterface]
    public class Stroke
    {
        public string Color { get; set; }
        public int Weight { get; set; }
        public double Opacity { get; set; }
    }

    [TypeScriptInterface]
    public class LatLng
    {
        public double Latitude { get; set; }
        public double Longitude { get; set; }
    }
}