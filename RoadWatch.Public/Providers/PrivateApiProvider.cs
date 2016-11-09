using System;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using System.Web.Script.Serialization;
using RoadWatch.Common.IocAttributes;
using RoadWatch.Common.Model;
using RoadWatch.Common.Providers;
using RoadWatch.Common.Providers.Logging;
using Newtonsoft.Json;

namespace RoadWatch.Public.Providers
{
    public interface IPrivateApiProvider
    {
        Task<T> InvokeGetAsync<T>(string controller, string method, string param = null);
        Task<T> InvokeGetAsync<T>(string controller, string method, int param);
        Task<T> InvokePostAsync<T>(string controller, string method, object request);
    }

    [PerRequest]
    public class PrivateApiProvider : IPrivateApiProvider
    {
        private readonly ILoggingProvider _loggingProvider;
        private readonly IInternalApiCallerResolverProvider _internalApiCallerResolver;

        private readonly string _privateWebUrl;
        
        public PrivateApiProvider(IConfigurationManagerProvider configurationManagerProvider, 
            ILoggingProvider loggingProvider,
            IInternalApiCallerResolverProvider internalApiCallerResolverProvider
            )
        {
            _loggingProvider = loggingProvider;
            _internalApiCallerResolver = internalApiCallerResolverProvider;

            _privateWebUrl = configurationManagerProvider.GetConfigValue("PrivateWebUrl");
        }
        
        private string GetApiUrl(string controller, string method, string param = null)
        {
            var output =  $"{_privateWebUrl}/api/{controller}/{method}";

            if (!string.IsNullOrEmpty(param))
            {
                output += $"/{param}";
            }
            return output;
        }
        
        public async Task<T> InvokeGetAsync<T>(string controller,string method, string param=null)
        {
            Uri uri = new Uri(GetApiUrl(controller, method, param));

            HttpResponseMessage response = await DoRequest(HttpMethod.Get, uri);
            byte[] bodyArray = await response.Content.ReadAsByteArrayAsync();
            var decoded = Encoding.Unicode.GetString(bodyArray);
            
            return JsonConvert.DeserializeObject<T>(decoded);
        }

        public Task<T> InvokeGetAsync<T>(string controller, string method, int param)
        {
            return InvokeGetAsync<T>(controller, method, param.ToString());
        }

        public async Task<T> InvokePostAsync<T>(string controller, string method,object request)
        {
            Uri uri = new Uri(GetApiUrl(controller, method));

            HttpResponseMessage response = await DoRequest(HttpMethod.Post, uri, request);
            byte[] bodyArray = await response.Content.ReadAsByteArrayAsync();
            var decoded = Encoding.Unicode.GetString(bodyArray);

            return JsonConvert.DeserializeObject<T>(decoded);
        }
        
        private async Task<HttpResponseMessage> DoRequest(HttpMethod method, Uri uri, object content = null)
        {
            var messageHandler = new HttpClientHandler { UseDefaultCredentials = true };
            var client = new HttpClient(messageHandler);

            var request = new HttpRequestMessage()
            {
                Method = method,
                RequestUri = uri
            };

            request.Headers.UserAgent.Add(new ProductInfoHeaderValue(Constants.PrivateApiUserAgent, "1"));

            var callerId = _internalApiCallerResolver.Caller;
            if (callerId == null)
            {
                throw new PrivateApiException("Caller Id cannot be identified");
            }

            var caller = JsonConvert.SerializeObject(callerId);
            request.Headers.Add(Constants.InternalApiCallerIdentityHeader, caller);

            if (method == HttpMethod.Put || method == HttpMethod.Post)
            {
                var data = JsonConvert.SerializeObject(content);
                byte[] unicodeData = Encoding.Unicode.GetBytes(data);
                ByteArrayContent httpContent = new ByteArrayContent(unicodeData);
                request.Content = httpContent;
                request.Content.Headers.ContentType = new MediaTypeHeaderValue(Constants.AprivateApiMediaType);
            }
            string body = "";
            var response = await client.SendAsync(request);
            try
            {
                body = await response.Content.ReadAsStringAsync();
                response.EnsureSuccessStatusCode();
            }
            catch (Exception e)
            {
                string errorMessage = "";
                string stackTrace = "";

                if (response.StatusCode == HttpStatusCode.InternalServerError)
                {
                    if (request.Headers.Contains(Constants.OriginalExceptionHeader) &&
                        request.Headers.Contains(Constants.OriginalExceptionStackHeader))
                    {
                        errorMessage = response.Headers.GetValues(Constants.OriginalExceptionHeader).ElementAt(0);
                        stackTrace = response.Headers.GetValues(Constants.OriginalExceptionStackHeader).ElementAt(0);
                    }
                    else
                    {
                        errorMessage = body;
                    }
                }
                if (response.StatusCode == HttpStatusCode.NotFound)
                {
                    errorMessage =
                        "Could not locate service! check the names and signatures of the methods in the controller";
                }

                var message = $"Error on sending request to :'{uri}', status code:{response.StatusCode}, method:{method}, error:{errorMessage}, stack:{stackTrace}";
                _loggingProvider.Logger.Error(message, e);
                var inner = new PrivateApiException(message, e);
                var ex = new PrivateApiException(errorMessage, inner);
                throw ex;
            }
            return response;
        }

        private class PrivateApiException : Exception
        {
            public PrivateApiException(string message) : base(message)
            {
            }
            public PrivateApiException(string message, Exception innerException) : base(message, innerException)
            {
            }
        }
    }
}