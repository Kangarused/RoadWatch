using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using RoadWatch.Common.IocAttributes;
using RoadWatch.Private.Hubs;

namespace RoadWatch.Private.Providers
{
    public interface ISignalrHubProvider
    {
        void MapUpdated();
        void AnnouncementsUpdated();
        void PublicReportsUpdated();
    }

    [Singleton]
    public class SignalrHubProvider : ISignalrHubProvider
    {
        private IHubConnectionContext<dynamic> Clients { get; set; }

        public SignalrHubProvider()
        {
            Clients = GlobalHost.ConnectionManager.GetHubContext<RoadWatchHub>().Clients;
        }

        public void MapUpdated()
        {
            Clients.All.mapUpdated(true);
        }

        public void AnnouncementsUpdated()
        {
            Clients.All.announcementsUpdated(true);
        }

        public void PublicReportsUpdated()
        {
            Clients.All.publicReportsUpdated(true);
        }
    }
}