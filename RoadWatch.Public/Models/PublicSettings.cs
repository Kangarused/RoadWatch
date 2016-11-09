using T4TS;

namespace RoadWatch.Public.Models
{
    [TypeScriptInterface]
    public class PublicSettings
    {
        public string Environment { get; set; }
        public string BuildVersion { get; set; }
        public long DatabaseVersion { get; set; }
        public string AuthClientId { get; set; }
        public bool IsDebugMode { get; set; }
    }
}