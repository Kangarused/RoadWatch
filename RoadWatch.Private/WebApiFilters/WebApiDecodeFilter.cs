using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;
using Autofac.Integration.WebApi;
using RoadWatch.Common.Model;
using RoadWatch.Common.Providers;

namespace RoadWatch.Private.WebApiFilters
{
    public class WebApiDecodeFilter : ActionFilterAttribute, IAutofacActionFilter
    {

        public WebApiDecodeFilter()
        {
        }

        public override async void OnActionExecuted(HttpActionExecutedContext context)
        {
            if (context.Response != null && context.Request.Headers.UserAgent.ElementAt(0).Product.Name == Constants.PrivateApiUserAgent && context.Request.Method == HttpMethod.Get)
            {
                if (context.Response.Content != null)
                {
                    var byteArray = await context.Response.Content.ReadAsByteArrayAsync();
                    var message = Encoding.UTF8.GetString(byteArray, 0, byteArray.Length);
                    byte[] encoded = Encoding.Unicode.GetBytes(message);
                    context.Response.Content = new ByteArrayContent(encoded);
                }
            }
            base.OnActionExecuted(context);
        }
    }
}