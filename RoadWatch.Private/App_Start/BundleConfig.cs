using System.Reflection;
using System.Web.Optimization;
using RoadWatch.Common.Utils;

namespace RoadWatch.Private
{
    public class BundleConfig
    {
        private static readonly string Version = "_" + Assembly.GetCallingAssembly().GetName().Version;
        public static readonly string SiteScripts = "~/bundles/scripts" + Version;
        public static readonly string SiteStyles = "~/bundles/styles" + Version;
        public static string SitePartials = "~/bundles/partials" + Version;

        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new StyleBundle(SiteStyles)
                .Include("~/Content/styles/road-watch-private.css", new CssRewriteUrlTransform())
           );

            bundles.Add(new ScriptBundle(SiteScripts)
                .Include("~/Scripts/Enums.js")
                .IncludeDirectory("~/Scripts", "*.js")
                //.IncludeDirectory("~/App/models", "*.js")
                .IncludeDirectory("~/App/controllers", "*.js")
                .IncludeDirectory("~/App/controllers/modals", "*.js")
                .IncludeDirectory("~/App/services", "*.js")
                //.IncludeDirectory("~/App/factories", "*.js")
                .IncludeDirectory("~/App/directives", "*.js")
                .Include("~/App/app.js")
                .Include("~/App/appValidationRules.js")
                .Include("~/App/appValidationSchemas.js")
            );

            bundles.Add(new NgTemplateBundle("roadWatch", SitePartials)
                .IncludeDirectory("~/App/views", "*.html")
                .IncludeDirectory("~/App/views/modals", "*.html")
            );
        }
    }
}