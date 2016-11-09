using System;
using System.Configuration;
using RoadWatch.Common.IocAttributes;
using RoadWatch.Common.Utils.Extensions;

namespace RoadWatch.Common.Providers
{
    public interface IConfigurationManagerProvider
    {
        Configuration GetConfiguration();
        bool IsDebugMode();
        string GetConfigValue(string key);
        
        bool GetConfigBoolValue(string key);

        string GetConnectionString(string name = null);
    }
    
    [Singleton]
    public class ConfigurationManagerProvider : IConfigurationManagerProvider
    {
        private readonly string _defaultConnectionStringName;

        public ConfigurationManagerProvider(string defaultConnectionStringName)
        {
            
            _defaultConnectionStringName = defaultConnectionStringName;
        }

        public Configuration GetConfiguration()
        {
            return System.Web.Configuration.WebConfigurationManager.OpenWebConfiguration("~");
        }

        public bool IsDebugMode()
        {
            return GetConfigBoolValue("DebugMode");
        }

        public string GetConfigValue(string key)
        {
            var value = ConfigurationManager.AppSettings[key];
            if (value.IsNullOrEmpty())
            {
                throw new ArgumentException("Could not find key:" + key + ", in AppSettings in web.config file");
            }
            return value;
        }
        


        public bool GetConfigBoolValue(string key)
        {
            var value = ConfigurationManager.AppSettings[key];
            if (value == null)
                return false;
            return Convert.ToBoolean(value);
        }

        /// <summary>
        /// Get Connection string from web.config
        /// </summary>
        /// <param name="name">Optionally pass name as parameter if null then first connectionstring is obtained, if name is not specified then default is used.</param>
        /// <returns></returns>
        public string GetConnectionString(string name = null)
        {
            return string.IsNullOrEmpty(name)
                ? ConfigurationManager.ConnectionStrings[_defaultConnectionStringName].ConnectionString
                : ConfigurationManager.ConnectionStrings[name].ConnectionString;
        }
    }
}