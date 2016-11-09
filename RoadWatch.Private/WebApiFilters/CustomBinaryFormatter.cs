using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using RoadWatch.Common.Providers;
using Newtonsoft.Json;

namespace RoadWatch.Private.WebApiFilters
{
    public class CustomBinaryFormatter : MediaTypeFormatter
    {
        public CustomBinaryFormatter()
        {
            SupportedMediaTypes.Add(new MediaTypeHeaderValue("road-watch/binary"));
        }

        public override bool CanReadType(Type type)
        {

            return true;
        }

        public override bool CanWriteType(Type type)
        {
            return true;
        }

        public override Task<object> ReadFromStreamAsync(Type type, Stream readStream, HttpContent content, IFormatterLogger formatterLogger)
        {
            using (var ms = new MemoryStream())
            {
                readStream.CopyTo(ms);
                var plainText = ms.ToArray();
                var decoded = Encoding.Unicode.GetString(plainText);
                object result = JsonConvert.DeserializeObject(decoded, type);
                return Task.FromResult(result);
            }
        }

        public override Task WriteToStreamAsync(Type type, object value, Stream writeStream, HttpContent content, TransportContext transportContext)
        {
            var obj = JsonConvert.SerializeObject(value);
            byte[] encoded = Encoding.Unicode.GetBytes(obj);
            var writer = new BinaryWriter(writeStream);
            writer.Write(encoded);
            var tcs = new TaskCompletionSource<object>();
            tcs.SetResult(null);
            return tcs.Task;
        }
    }
}