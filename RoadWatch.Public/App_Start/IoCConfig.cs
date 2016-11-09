using Autofac;
using RoadWatch.Common.Providers;
using RoadWatch.Common.Providers.Logging;

namespace RoadWatch.Public
{
    public class IoCConfig
    {
        public static void ConfigureIoc(ContainerBuilder builder)
        {
            builder.Register(c => new ConfigurationManagerProvider("")).As<IConfigurationManagerProvider>().SingleInstance();
            builder.Register(c => new LoggingProvider("Road Watch Public")).As<ILoggingProvider>().SingleInstance();
        }
    }
}