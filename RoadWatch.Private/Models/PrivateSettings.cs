using T4TS;

namespace RoadWatch.Private.Models
{
    [TypeScriptInterface]
    public class PrivateSettings
    {
        public UserDetails CurrentUser { get; set; }
        public string Environment { get; set; }
        public bool IsDebugMode { get; set; }
        public string BuildVersion { get; set; }
        public long DatabaseVersion { get; set; }
    }
}