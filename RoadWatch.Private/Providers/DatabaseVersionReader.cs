using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using RoadWatch.Common.IocAttributes;
using RoadWatch.Common.Providers;
using RoadWatch.Private.Database.Readers;

namespace RoadWatch.Private.Providers
{
    [Singleton]
    public class DatabaseVersionReader : IDatabaseVersionReader
    {
        private readonly IPrivateReader _privateReader;

        public DatabaseVersionReader(IPrivateReader privateReader)
        {
            _privateReader = privateReader;
        }

        public Task<long> GetDatabaseVersionAsync()
        {
            return _privateReader.GetDatabaseVersion();
        }
    }
}