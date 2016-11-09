using FluentValidation;
using RoadWatch.Common.Model;

namespace RoadWatch.Private.Models.Validators
{
    public class PublicReportValidator : AbstractValidator<PublicReport>
    {
        public PublicReportValidator()
        {
            RuleFor(x => x.RoadConditionType).NotEmpty();

            RuleFor(x => x.Condition).NotEmpty().When(x => x.RoadConditionType == RoadConditionTypes.Harzard.ToString());
            RuleFor(x => x.Condition).NotEmpty().When(x => x.RoadConditionType == RoadConditionTypes.SpecialEvent.ToString());
            RuleFor(x => x.Condition).NotEmpty().When(x => x.RoadConditionType == RoadConditionTypes.VehicleCollision.ToString());

            RuleFor(x => x.Road).NotEmpty();
            RuleFor(x => x.Area).NotEmpty();
        }
    }
}