using System.Web.Hosting;
using System.Web.Optimization;
using System.Web.Routing;
using RoadWatch.Common;
using RoadWatch.Common.Utils.EmbeddedResourcesUtils;

[assembly: WebActivatorEx.PostApplicationStartMethod(typeof(CommonBundleConfig), "Start")]
namespace RoadWatch.Common
{
    public class CommonBundleConfig
    {
        public const string SiteCommonScripts = "~/RoadWatch/Embedded/Js";
        public const string SiteCommonAngularSettings = "~/RoadWatch/Embedded/As";
        public const string SiteCommonStyles = "~/RoadWatch/Embedded/Styles";

        public static void Start()
        {
            ConfigureRoutes();
            ConfigureBundles();
        }

        private static void ConfigureBundles()
        {
            //used to debug issues with resource embedding, uncomment bellow and inpect test to see what is embedded and the resource name
            //var test = System.Reflection.Assembly.GetExecutingAssembly().GetManifestResourceNames();

            BundleTable.VirtualPathProvider = new EmbeddedVirtualPathProvider(HostingEnvironment.VirtualPathProvider);
            BundleTable.Bundles.Add(new ScriptBundle(SiteCommonScripts)
                .Include(
                    "~/RoadWatch/Embedded/scripts/jquery/jquery-3.1.1.js",
                    "~/RoadWatch/Embedded/scripts/angular/angular.js",
                    "~/RoadWatch/Embedded/scripts/bootstrap/bootstrap.js",
                    "~/RoadWatch/Embedded/scripts/angular/angular-animate.js",
                    "~/RoadWatch/Embedded/scripts/angular/angular-touch.js",
                    "~/RoadWatch/Embedded/scripts/angular/angular-case.js",
                    "~/RoadWatch/Embedded/scripts/angular/angular-sanitize.js",
                    "~/RoadWatch/Embedded/scripts/angular-pubsub/angular-pubsub.js",
                    "~/RoadWatch/Embedded/scripts/angular-validation/angular-validation.js",
                    "~/RoadWatch/Embedded/scripts/angular-validation/angular-validation-schema.js",
                    "~/RoadWatch/Embedded/scripts/angular-messages/angular-messages.js",
                    "~/RoadWatch/Embedded/scripts/angular-ui-router/angular-ui-router.js",
                    "~/RoadWatch/Embedded/scripts/angular-bootstrap/ui-bootstrap-2.2.0.js",
                    "~/RoadWatch/Embedded/scripts/angular-ui-router/ct-ui-router-extras.js",
                    "~/RoadWatch/Embedded/scripts/lodash/lodash.js",
                    "~/RoadWatch/Embedded/scripts/angular-simple-logger/angular-simple-logger.js",
                    "~/RoadWatch/Embedded/scripts/angular-google-maps/angular-google-maps.js",
                    "~/RoadWatch/Embedded/scripts/linqjs/linq.js",
                    "~/RoadWatch/Embedded/scripts/toastr/toastr.js",
                    "~/RoadWatch/Embedded/scripts/moment/moment.js",
                    "~/RoadWatch/Embedded/scripts/bootstrap-datetimepicker/bootstrap-datetimepicker.min.js",
                    "~/RoadWatch/Embedded/scripts/bootstrap-datetimepicker/bootstrap-datetimepicker-directive.js",
                    "~/RoadWatch/Embedded/scripts/signalr/jquery.signalR-2.2.1.js"
            ));

            BundleTable.Bundles.Add(new ScriptBundle(SiteCommonAngularSettings)
                .Include(
                    "~/RoadWatch/Embedded/scripts/common-angular-settings/common-angular-init-settings.js"
                )
            );

            BundleTable.Bundles.Add(new StyleBundle(SiteCommonStyles)
               .Include(
                    "~/RoadWatch/Embedded/styles/toastr/toastr.css",
                    "~/RoadWatch/Embedded/styles/bootstrap-datetimepicker/bootstrap-datetimepicker.css"
                )
           );
        }

        private static void ConfigureRoutes()
        {
            RouteTable.Routes.Insert(0,
                new Route("RoadWatch/Embedded/scripts/{folder}/{file}.{extension}",
                    new RouteValueDictionary(new { }),
                    new RouteValueDictionary(new { extension = "js" }),
                    new EmbeddedResourceRouteHandler()
                )
            );

            RouteTable.Routes.Insert(0,
                new Route("RoadWatch/Embedded/styles/{folder}/{file}.{extension}",
                    new RouteValueDictionary(new { }),
                    new RouteValueDictionary(new { extension = "css" }),
                    new EmbeddedResourceRouteHandler()
                )
            );
        }
    }
}