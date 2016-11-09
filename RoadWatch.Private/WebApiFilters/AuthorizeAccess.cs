using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;
using RoadWatch.Common.Model;
using RoadWatch.Private.Models;
using RoadWatch.Private.Providers;

namespace RoadWatch.Private.WebApiFilters
{
    public class AuthorizeAccess : FilterAttribute, IAuthorizationFilter
    {
        public IUserResolver UserResolver { get; set; }

        private readonly Role[] _roles;

        public AuthorizeAccess()
        {
            _roles = new Role[0];
        }

        public AuthorizeAccess(params Role[] roles)
        {
            _roles = roles;
        }

        public async Task<HttpResponseMessage> ExecuteAuthorizationFilterAsync(HttpActionContext actionContext, CancellationToken cancellationToken,
           Func<Task<HttpResponseMessage>> continuation)
        {
            OnAuthentication(actionContext);
            return actionContext.Response ?? await continuation();
        }

        private void OnAuthentication(HttpActionContext actionContext)
        {
            UserDetails user = UserResolver.GetUser();

            var hasAccess =
                user.Roles.Contains(Role.SystemAdministrator) || 
                (user.IsPrivateApiClient && user.IsAnonymous && _roles.Length == 0) ||
                user.Roles.Intersect(_roles).Any();
            
            if (!hasAccess)
            {
                actionContext.Response = actionContext.Request.CreateResponse(HttpStatusCode.Forbidden);
            }
        }
    }
}