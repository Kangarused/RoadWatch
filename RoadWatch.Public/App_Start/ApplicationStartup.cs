using System.Net;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using Autofac;
using RoadWatch.Common;
using RoadWatch.Common.Providers;
using RoadWatch.Common.Providers.Logging;
using RoadWatch.Public;
using Exceptionless;
using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(ApplicationStartup))]
namespace RoadWatch.Public
{
    public class ApplicationStartup
    {
        public void Configuration(IAppBuilder app)
        {
            var config = new HttpConfiguration();

            AreaRegistration.RegisterAllAreas();
            log4net.Config.XmlConfigurator.Configure();

            var webAssembly = typeof(ApplicationStartup).Assembly;
            var builder = CommonIoCConfig.InitIoc(webAssembly, new []{ typeof(CommonIoCConfig).Assembly });
            IoCConfig.ConfigureIoc(builder);
            var container = CommonIoCConfig.WireIoc(builder, config, webAssembly);

            var configManager = container.Resolve<IConfigurationManagerProvider>();
            CommonWebApiConfig.Register(config, configManager.IsDebugMode());

            app.UseWebApi(config);

            BundleConfig.RegisterBundles(BundleTable.Bundles);
            CommonRouteConfig.RegisterRoutes(RouteTable.Routes);

            var log = container.Resolve<ILoggingProvider>();
            log.Logger.Info("Public App Starting");

            //Hack to accept all server certificates -- for demonstration 
            ServicePointManager.ServerCertificateValidationCallback += (sender, cert, chain, sslPolicyErrors) => true;
        }
    }
}