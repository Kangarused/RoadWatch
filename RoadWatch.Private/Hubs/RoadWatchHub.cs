using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using RoadWatch.Common.Model;

namespace RoadWatch.Private.Hubs
{
    [HubName("roadWatchHub")]
    public class RoadWatchHub : Hub
    {
        public void MapUpdated()
        {
            Clients.All.mapUpdated(true);
        }

        public void AnnouncementsUpdated()
        {
            Clients.All.announcementsUpdate(true);
        }

        public void PublicReportsUpdated()
        {
            Clients.All.publicReportsUpdated(true);
        }
    }
}