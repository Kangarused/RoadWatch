using System;
using System.Linq;
using System.Security.Claims;
using RoadWatch.Common.IocAttributes;
using RoadWatch.Common.Model;
using RoadWatch.Common.Utils.Extensions;

namespace RoadWatch.Public.Providers
{
    public interface IInternalApiCallerResolverProvider
    {
        InternalApiCallerIdentity Caller { get; }
    }

    [PerRequest]
    public class InternalApiCallerResolverProvider : IInternalApiCallerResolverProvider
    {
        public InternalApiCallerIdentity Caller { get; }

        public InternalApiCallerResolverProvider()
        {
            Caller = GetCaller();
        }

        private InternalApiCallerIdentity GetCaller()
        {
            var context = System.Web.HttpContext.Current;
            if (context == null) return null;

            var request = context.Request;
            string ipStr = request.GetIpAddress();
            int id = 0;
            string email = "Anonymous";
            string name = "Anonymous";
            string role = Role.Anonymous.ToString();
            bool isAnonymous = true;

            if (context.User!=null && context.User.Identity.IsAuthenticated)
            {
                var claimsIdentity = (ClaimsIdentity) context.User.Identity;
                var claims = claimsIdentity.Claims.ToList();
                var roleClaim = claims.FirstOrDefault(c => c.Type == ClaimTypes.Role);
                role = roleClaim == null ? null : roleClaim.Value;
                email = context.User.Identity.Name;
                isAnonymous = false;
                name = claims.First(c => c.Type == ClaimTypes.GivenName).Value;
                id = Convert.ToInt32(claims.First(c => c.Type == ClaimTypes.NameIdentifier).Value);
            }

            return new InternalApiCallerIdentity { Email = email, IpAddress = ipStr, Role = role, IsAnonymous = isAnonymous, Name = name, Id = id };
        }
    }
}