using System;
using System.Web.Http;
using Autofac;
using RoadWatch.Private.WebApiFilters;

namespace RoadWatch.Private
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config, IContainer container)
        {
            config.Formatters.Add(new CustomBinaryFormatter());
            config.Filters.Add(new WebApiExceptionFilter());
        }
    }
}
