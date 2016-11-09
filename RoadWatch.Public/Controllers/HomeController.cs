using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using RoadWatch.Common.Model;
using RoadWatch.Common.Providers;
using RoadWatch.Common.Providers.Logging;
using RoadWatch.Public.Models;
using Exceptionless;

namespace RoadWatch.Public.Controllers
{
    public class HomeController : Controller
    {
        private readonly IVersionProvider _versionProvider;
        private readonly IConfigurationManagerProvider _configurationManagerProvider;
        private readonly ILoggingProvider _loggingProvider;

        public HomeController(
            IVersionProvider versionProvider, 
            IConfigurationManagerProvider configurationManagerProvider,
            ILoggingProvider loggingProvider
        )
        {
            _versionProvider = versionProvider;
            _configurationManagerProvider = configurationManagerProvider;
            _loggingProvider = loggingProvider;
        }

        public async Task<ActionResult> Index()
        {
            ViewBag.ConfigSettings = await LoadSettingsAsync();
            return View();
        }

        private async Task<PublicSettings> LoadSettingsAsync()
        {
            long databaseVersion = 0L;
            try
            {
                databaseVersion = await _versionProvider.GetDatabaseVersionAsync();
            }
            catch (Exception e)
            {
                e.ToExceptionless().Submit();
                _loggingProvider.Logger.Error("Problem retreiving Database version, Database or Private API might be down!", e);
            }

            var output = new PublicSettings
            {
                BuildVersion = _versionProvider.BuildVersion,
                DatabaseVersion = databaseVersion,
                Environment = _configurationManagerProvider.GetConfigValue("Environment"),
                AuthClientId = Constants.AuthClientId,
                IsDebugMode = _configurationManagerProvider.GetConfigBoolValue("DebugMode")
            };

            return output;
        }
    }
}