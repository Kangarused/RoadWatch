using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;
using RoadWatch.Common.Model;
using RoadWatch.Public.Providers;

namespace RoadWatch.Public.Controllers
{
    public class MapController : ApiController
    {
        private readonly IPrivateApiProvider _privateApiProvider;

        public MapController(IPrivateApiProvider privateApiProvider)
        {
            _privateApiProvider = privateApiProvider;
        }

        [AcceptVerbs("GET")]
        public async Task<List<MapObject>> GetMapObjects()
        {
            var objects = await _privateApiProvider.InvokeGetAsync<List<MapObject>>("Map", "GetMapObjects");
            return objects;
        }
    }
}