using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using Autofac;
using RoadWatch.Common.Model;
using RoadWatch.Common.Providers;
using RoadWatch.Private.Database.OrmLiteInfrastructure;
using RoadWatch.Private.Database.Repositories;
using RoadWatch.Private.Providers;
using RoadWatch.Private.WebApiFilters;

namespace RoadWatch.Private.Controllers
{
    public class SystemController : ApiController
    {
        private readonly IDatabaseVersionReader _databaseVersionReader;

        public SystemController(IDatabaseVersionReader databaseVersionReader)
        {
            _databaseVersionReader = databaseVersionReader;
        }

        [InternalApiAuthorize]
        [AcceptVerbs("GET")]
        public Task<long> GetDatabaseVersion()
        {
            return _databaseVersionReader.GetDatabaseVersionAsync();
        }
    }
}