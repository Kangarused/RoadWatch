using System.Threading.Tasks;
using System.Web.Mvc;
using RoadWatch.Common.Model;
using RoadWatch.Common.Providers;
using RoadWatch.Common.Providers.Logging;
using RoadWatch.Private.Models;
using RoadWatch.Private.Providers;

namespace RoadWatch.Private.Controllers
{
    public class HomeController : Controller
    {
        private readonly IVersionProvider _versionProvider;
        private readonly IConfigurationManagerProvider _configurationManagerProvider;
        private readonly ILoggingProvider _loggingProvider;
        private readonly IUserResolver _userResolver;

        public HomeController(
            IVersionProvider versionProvider, 
            IConfigurationManagerProvider configurationManagerProvider,
            ILoggingProvider loggingProvider,
            IUserResolver userResolver
        )
        {
            _versionProvider = versionProvider;
            _configurationManagerProvider = configurationManagerProvider;
            _loggingProvider = loggingProvider;
            _userResolver = userResolver;
        }
        
        public async Task<ActionResult> Index()
        {
            ViewBag.ConfigSettings = await LoadSettingsAsync();
            return View();
        }

        private async Task<PrivateSettings> LoadSettingsAsync()
        {
            var output = new PrivateSettings
            {
                BuildVersion = _versionProvider.BuildVersion,
                Environment = _configurationManagerProvider.GetConfigValue("Environment"),
                CurrentUser = _userResolver.GetUser(),
                DatabaseVersion = await _versionProvider.GetDatabaseVersionAsync(),
                IsDebugMode = _configurationManagerProvider.GetConfigBoolValue("DebugMode")
        };

            return output;
        }
    }
}