using System;
using System.Net.Http.Headers;
using System.Web.Http.Filters;

namespace RoadWatch.Common.Model.Attributes
{
    /// <summary>
    /// Temporary implementation of caching non-changing drop down lists. To eventually be replaced by an angular implementation using a clientside http cache.
    /// </summary>
    /// <seealso cref="System.Web.Http.Filters.ActionFilterAttribute" />
    public class OneHourCacheAttribute : System.Web.Http.Filters.ActionFilterAttribute
    {
        public int MaxAge { get; set; }

        public OneHourCacheAttribute()
        {
            MaxAge = 3600;
        }

        public override void OnActionExecuted(HttpActionExecutedContext context)
        {
            if (context.Response != null)
                context.Response.Headers.CacheControl = new CacheControlHeaderValue()
                {
                    Public = true,
                    MaxAge = TimeSpan.FromSeconds(MaxAge)
                };

            base.OnActionExecuted(context);
        }
    }
}
