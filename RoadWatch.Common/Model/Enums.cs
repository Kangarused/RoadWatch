using System.ComponentModel;
using RoadWatch.Common.Utils;

namespace RoadWatch.Common.Model
{
    [TypescriptEnum]
    public enum Role
    {
        [Description("System Administrator")]
        SystemAdministrator,
        [Description("Anonymous User")]
        Anonymous
    }

    [TypescriptEnum]
    public enum RoadConditionTypes
    {
        [Description("Roadworks")]
        Roadworks,
        [Description("Vehicle Collision")]
        VehicleCollision,
        [Description("Road Closed")]
        Closure,
        [Description("Flooding")]
        Flooding,
        [Description("Hazard")]
        Harzard,
        [Description("Special Event")]
        SpecialEvent
    }

    [TypescriptEnum]
    public enum FloodingTypes
    {
        [Description("Area is impassable")]
        Impassable,
        [Description("Area is dangerous to cross")]
        Dangerous,
        [Description("Area is crossable with care")]
        Passable
    }

    [TypescriptEnum]
    public enum CollisionTypes
    {
        [Description("Single vehicle invovled")]
        SingleVehicle,
        [Description("Multiple vehicles involved")]
        MultipleVehicles
    }

    [TypescriptEnum]
    public enum HazardTypes
    {
        [Description("Road damage")]
        RoadDamage,
        [Description("Animal crossing")]
        AnimalCrossing,
        [Description("Poor traction")]
        PoorTraction,
        [Description("Debris covering road")]
        DebrisCover,
        [Description("Bush fires")]
        BushFires,
        [Description("Heavy fog")]
        HeavyFog,
        [Description("Heavy smoke cover")]
        HeavySmokeCover,
    }

    [TypescriptEnum]
    public enum ConditionEffectTypes
    {
        [Description("All lanes affected")]
        AllLanesAffected,
        [Description("All directions affected")]
        AllDirections,
        [Description("Delays expected")]
        DelaysExpected,
        [Description("Reduced speed limit")]
        ReducedSpeedLimit,
        [Description("Proceed with caution")]
        ProceedWithCaution,
        [Description("No delays expected")]
        NoDelaysExpected,
        [Description("Changed traffic conditions")]
        ChangedTrafficConditions,
        [Description("Restricted to four wheel drive vehicles only")]
        RestrictedToFourWheelDrives,
        [Description("Restricted to high clearance vehicles only")]
        RestrictedToHighClearanceVehicles,
        [Description("Traffic control on scene")]
        TrafficControlOnScene,
    }
}
