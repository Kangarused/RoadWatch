namespace RoadWatch.Common.Model
{
    public class InternalApiCallerIdentity
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string IpAddress { get; set; }
        public string Role { get; set; }
        public bool IsAnonymous { get; set; }
        public string Name { get; set; }
    }
}
