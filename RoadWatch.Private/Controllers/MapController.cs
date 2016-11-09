using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Threading.Tasks;
using System.Web.Http;
using Newtonsoft.Json;
using RoadWatch.Common.Model;
using RoadWatch.Private.Database.Repositories;
using RoadWatch.Private.Providers;
using RoadWatch.Private.WebApiFilters;

namespace RoadWatch.Private.Controllers
{
    public class MapController : ApiController
    {
        private readonly IUserResolver _userResolver;
        private readonly IRoadConditionRepository _roadConditionRepository;
        private readonly ISignalrHubProvider _signalrHubProvider;

        public MapController(
            IUserResolver userResolver,
            IRoadConditionRepository roadConditionRepository,
            ISignalrHubProvider signalrHubProvider)
        {
            _userResolver = userResolver;
            _roadConditionRepository = roadConditionRepository;
            _signalrHubProvider = signalrHubProvider;
        }

        [AcceptVerbs("GET")]
        public async Task<List<MapObject>> GetMapObjects()
        {
            var results = await _roadConditionRepository.GetAllAsync();
            var objs = results.Select(result => JsonConvert.DeserializeObject<MapObject>(result.MapObject)).ToList();
            return objs;
        }

        [AcceptVerbs("GET")]
        public async Task<List<MapObject>> GetMapObjectsEditable()
        {
            var results = await _roadConditionRepository.GetAllAsync();
            if (results != null)
            {
                var objs = results.Select(result => JsonConvert.DeserializeObject<MapObject>(result.MapObject)).ToList();

                foreach (var obj in objs)
                {
                    foreach (var path in obj.Paths)
                    {
                        path.Static = false;
                    }
                }
                return objs;
            }
            return null;
        }

        [AcceptVerbs("POST")]
        [AuthorizeAccess(Role.SystemAdministrator)]
        public async Task<ActionResponseGeneric<string>> DeleteMapObject(MapObject mapObject)
        {
            var roadConditionId = await _roadConditionRepository.GetIdByMarkerId(mapObject.Marker.Id);
            if (roadConditionId != 0)
            {
                await _roadConditionRepository.DeleteAsync(x => x.Id == roadConditionId);
                _signalrHubProvider.MapUpdated();
                return new ActionResponseGeneric<string>
                {
                    Succeed = true,
                    Response = "Successfully deleted the map object"
                };
            }
            return new ActionResponseGeneric<string>
            {
                Succeed = false,
                Response = "Object not found"
            };
        }

        [AcceptVerbs("POST")]
        [AuthorizeAccess(Role.SystemAdministrator)]
        public async Task<ActionResponseGeneric<string>> SaveMapObjects(MapObjectCollection mapObjects)
        {
            var currentUser = _userResolver.GetUser();
            foreach (var obj in mapObjects.Collection)
            {
                // Create road condition object
                RoadCondition roadCondition = new RoadCondition
                {
                    MarkerId = obj.Marker.Id,
                    RoadConditionType = obj.RoadConditionType.ToString(),
                    Condition = obj.Condition,
                    Duration = obj.Duration,
                    AdditionalInformation = obj.AdditionalInformation,
                    ConditionEffects = JsonConvert.SerializeObject(obj.ConditionEffects),
                    Road = obj.Road,
                    Area = obj.Area,
                    CreatedBy = currentUser.Email,
                    CreatedTime = DateTime.Now,
                    ModifiedBy = currentUser.Email,
                    ModifiedTime = DateTime.Now
                };

                // Make items un-editable
                obj.Marker.Options.Draggable = false;

                foreach (var path in obj.Paths)
                {
                    path.Clickable = false;
                    path.Draggable = false;
                    path.Editable = false;
                    path.Static = true;
                }

                roadCondition.Id = await _roadConditionRepository.GetIdByMarkerId(obj.Marker.Id);

                // Save map object
                roadCondition.MapObject = JsonConvert.SerializeObject(obj);

                await _roadConditionRepository.SaveAsync(roadCondition);
            }

            _signalrHubProvider.MapUpdated();
            return new ActionResponseGeneric<string>()
            {
                Succeed = true,
                Response = "Successfully saved map objects"
            };
        }
    }
}