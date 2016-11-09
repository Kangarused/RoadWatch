using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using RoadWatch.Common.Model;
using RoadWatch.Private.Database.Repositories;
using RoadWatch.Private.WebApiFilters;

namespace RoadWatch.Private.Controllers
{
    public class AuthController : ApiController
    {
        private readonly IAuthClientRepository _authClientRepository;
        
        public AuthController(IAuthClientRepository authClientRepository)
        {
            _authClientRepository = authClientRepository;
        }

        [AuthorizeAccess(Role.Anonymous)]
        [AcceptVerbs("GET")]
        public Task<AuthClient> GetAuthClient(string param)
        {
            return _authClientRepository.GetAuthClientByName(param);
        }
       
    }
}