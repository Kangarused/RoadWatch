using System.Web.Optimization;

namespace RoadWatch.Common.Utils
{
    public class NgTemplateBundle : Bundle
    {
        public NgTemplateBundle(string moduleName, string virtualPath)
            : base(virtualPath, new[] { new NgTemplateTransform(moduleName) })
        {
        }
    }
}