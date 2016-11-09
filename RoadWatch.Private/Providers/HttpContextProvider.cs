using System;
using System.Security.Principal;
using System.Text.RegularExpressions;
using System.Web;
using RoadWatch.Common.IocAttributes;
using RoadWatch.Common.Model;
using RoadWatch.Common.Utils.Extensions;
using Newtonsoft.Json;

namespace RoadWatch.Private.Providers
{
    public interface IHttpContextProvider
    {
        InternalApiCallerIdentity GetInternalApiCallerIdentity();
        bool IsInternalApiCall { get; }
        string GetIpAddress();
        string GetWindowsUsernameFromContext();
        bool IsWebContextSet { get; }
    }

    [Singleton]
    public class HttpContextProvider : IHttpContextProvider
    {
        public HttpContextProvider()
        {
        }

        private HttpContext Context => HttpContext.Current;


        public InternalApiCallerIdentity GetInternalApiCallerIdentity()
        {   
            string caller= Context.Request.Headers[Constants.InternalApiCallerIdentityHeader];
            return JsonConvert.DeserializeObject<InternalApiCallerIdentity>(caller);
        }

        public bool IsInternalApiCall => Context.Request.Headers["User-Agent"].Contains(Constants.PrivateApiUserAgent);

        public string GetIpAddress()
        {
            if (IsInternalApiCall)
            {
                throw new ArgumentException(
                    "Not available on Private API calls, use the encoded value in the request headers");
            }
            return Context.Request.GetIpAddress();
        }

        public string GetWindowsUsernameFromContext()
        {
            var identity = (WindowsIdentity)Context.User.Identity;
            var username = identity.Name;
            return Regex.Replace(username, ".*\\\\(.*)", "$1", RegexOptions.None);
        }

        public bool IsWebContextSet => Context != null;
    }
}