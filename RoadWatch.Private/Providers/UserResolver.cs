using System;
using System.Collections.Generic;
using System.Linq;
using RoadWatch.Common;
using RoadWatch.Common.IocAttributes;
using RoadWatch.Common.Model;
using RoadWatch.Common.Utils.Extensions;
using RoadWatch.Private.Database.OrmLiteInfrastructure;
using LazyCache;
using RoadWatch.Private.Models;
using ServiceStack.OrmLite;

namespace RoadWatch.Private.Providers
{
    public interface IUserResolver
    {
        UserDetails GetUser();
        void ResetUserCache(string username);
    }

    [PerRequest]
    public class UserResolver : IUserResolver
    {
        private readonly IHttpContextProvider _httpContextProvider;
        private readonly IAppCache _appCache;
        private readonly IUnitOfWork _unitOfWork;

        private const string UserResolverCacheKey = "UserResolverCacheKey";

        public UserResolver(
            IHttpContextProvider httpContextProvider,
            IAppCache appCache,
            IUnitOfWork unitOfWork
            )
        {
            _httpContextProvider = httpContextProvider;
            _appCache = appCache;

            _unitOfWork = unitOfWork;
        }


        private User LoadByWindowsUsername(string windowsUsername)
        {
            var credQuery = _unitOfWork.Db.From<UserCredential>()
            .Where(i => i.WindowsUsername == windowsUsername);

            var credResults = _unitOfWork.Db.LoadSelect(credQuery);
            var userCred = credResults.SingleOrDefault();

            var userQuery = _unitOfWork.Db.From<User>()
                .Where(i => i.Id == userCred.UserId);

            var userResults = _unitOfWork.Db.LoadSelect(userQuery);
            var user = userResults.SingleOrDefault();

            return user ?? null;
        }


        public UserDetails GetUser()
        {
            if (_httpContextProvider.IsInternalApiCall)
            {
                var caller = _httpContextProvider.GetInternalApiCallerIdentity();
                return new UserDetails
                {
                    IsAnonymous = caller.IsAnonymous,
                    DisplayName = caller.Name,
                    Email = caller.Email,
                    IsPrivateApiClient = true,
                    Roles = new List<Role> { { caller.Role.EnumParse<Role>() } },
                    IpAddress = caller.IpAddress,
                    Id = caller.Id,
                };
            }

            //var username = _httpContextProvider.GetWindowsUsernameFromContext();
            //var user = LoadByWindowsUsername(username);
            //var output = new UserDetails
            //{
            //    IsAnonymous = false,
            //    DisplayName = user != null ? user.Name : "Anonymous",
            //    Email = user != null ? user.Email : string.Empty,
            //    IsPrivateApiClient = false,
            //    Roles = user?.Roles.ToList() ?? new List<Role>(),
            //    IpAddress = _httpContextProvider.GetIpAddress(),
            //    Id = user?.Id ?? 0,
            //    WindowsUsername = username
            //};
            //return output;

            //Force fake account for demonstration
            return new UserDetails()
            {
                IsAnonymous = false,
                DisplayName = "Common Account",
                Email = "common.account@common.com.au",
                IsPrivateApiClient = false,
                Roles = new List<Role> { Role.SystemAdministrator },
                IpAddress = "127.0.0.1",
                Id = 1,
                WindowsUsername = "common.user"
            };
        }

        public void ResetUserCache(string username)
        {
            _appCache.Remove(UserResolverCacheKey + username);
        }
    }
}
