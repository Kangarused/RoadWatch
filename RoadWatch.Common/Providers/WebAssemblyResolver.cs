﻿using System.Reflection;

namespace RoadWatch.Common.Providers
{
    public interface IWebAssemblyResolver
    {
        Assembly WebAssembly { get; }
    }

    public class WebAssemblyResolver : IWebAssemblyResolver
    {
        public Assembly WebAssembly { get; private set; }

        public WebAssemblyResolver(Assembly webAssembly)
        {
            WebAssembly = webAssembly;
        }
    }
}