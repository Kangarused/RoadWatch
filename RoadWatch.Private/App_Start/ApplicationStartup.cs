using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using Autofac;
using Microsoft.AspNet.SignalR;
using RoadWatch.Private;
using Microsoft.Owin;
using Microsoft.Owin.Cors;
using Owin;
using RoadWatch.Common;
using RoadWatch.Common.Providers;
using RoadWatch.Common.Providers.Logging;

[assembly: OwinStartup(typeof(ApplicationStartup))]
namespace RoadWatch.Private
{
    public class ApplicationStartup
    {
        public void Configuration(IAppBuilder app)
        {
            var config = new HttpConfiguration();

            AreaRegistration.RegisterAllAreas();
            log4net.Config.XmlConfigurator.Configure();
            
            var webAssembly = typeof(ApplicationStartup).Assembly;
            var builder = CommonIoCConfig.InitIoc(webAssembly, new[] { typeof(CommonIoCConfig).Assembly });
            IoCConfig.ConfigureIoc(builder);
            var container = CommonIoCConfig.WireIoc(builder, config, webAssembly);

            var configManager = container.Resolve<IConfigurationManagerProvider>();
            CommonWebApiConfig.Register(config, configManager.IsDebugMode());
            
            WebApiConfig.Register(config, container);
            
            app.UseWebApi(config);
            app.UseCors(CorsOptions.AllowAll);
            app.MapSignalR();

            BundleConfig.RegisterBundles(BundleTable.Bundles);
            CommonRouteConfig.RegisterRoutes(RouteTable.Routes);

            var log = container.Resolve<ILoggingProvider>();
            log.Logger.Info("Private App Starting");    
        }   
    }
}