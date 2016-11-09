using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;
using RoadWatch.Common.Utils.Extensions;
using ServiceStack.DataAnnotations;

namespace RoadWatch.Common.Model
{
    public partial class User
    {
        [Reference]
        public List<UserRole> UserRoles { get; set; }

        private Role[] _roles;

        [JsonIgnore]
        [Ignore]
        public Role[] Roles
        {
            get
            {
                if (UserRoles == null)
                    return null;
                if (_roles == null)
                {
                    _roles = UserRoles.Select(i => i.Role.EnumParse<Role>()).ToArray();
                }
                return _roles;
            }
        }
    }
}
