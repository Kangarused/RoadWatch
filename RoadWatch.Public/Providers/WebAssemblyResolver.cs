using System.Reflection;

namespace RoadWatch.Public.Providers
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