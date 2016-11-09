using System.Web.Http;
using Autofac;
using Autofac.Integration.WebApi;
using RoadWatch.Common.Providers;
using RoadWatch.Common.Providers.Logging;
using RoadWatch.Private.Database.OrmLiteInfrastructure;
using RoadWatch.Private.WebApiFilters;

namespace RoadWatch.Private
{
    public class IoCConfig
    {
        public static void ConfigureIoc(ContainerBuilder builder)
        {
            builder.Register(c => new ConfigurationManagerProvider("RoadWatchConnectionString")).As<IConfigurationManagerProvider>().SingleInstance();
            builder.Register(c => new LoggingProvider("Road Watch Private")).As<ILoggingProvider>().SingleInstance();

            builder.Register(c => new WebApiDecodeFilter())
            .AsWebApiActionFilterFor<ApiController>()
            .InstancePerRequest();

            builder.Register(c => new TransactionFilterAttribute(c.Resolve<IUnitOfWork>()))
            .AsWebApiActionFilterFor<ApiController>()
            .InstancePerRequest();

            builder.Register(c => new WebApiExceptionFilter())
            .AsWebApiExceptionFilterFor<ApiController>()
            .InstancePerRequest();

        }
    }
}