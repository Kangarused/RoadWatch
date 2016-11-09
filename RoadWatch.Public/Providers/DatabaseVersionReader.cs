using System;
using System.Threading.Tasks;
using RoadWatch.Common.IocAttributes;
using RoadWatch.Common.Providers;

namespace RoadWatch.Public.Providers
{
    [Singleton]
    public class DatabaseVersionReader : IDatabaseVersionReader
    {
        private readonly IPrivateApiProvider _privateApiProvider;

        public DatabaseVersionReader(IPrivateApiProvider privateApiProvider)
        {
            _privateApiProvider = privateApiProvider;
        }
        
        public Task<long> GetDatabaseVersionAsync()
        {
            return _privateApiProvider.InvokeGetAsync<long>("System", "GetDatabaseVersion");
        }
    }
}