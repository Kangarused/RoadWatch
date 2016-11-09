using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using RoadWatch.Common.IocAttributes;

namespace RoadWatch.Common.Providers
{
    public interface IDateResolver
    {
        DateTime Now();
    }

    [Singleton]
    public class DateResolver : IDateResolver
    {
        public DateTime Now()
        {
            return DateTime.Now;
        }
    }
}
