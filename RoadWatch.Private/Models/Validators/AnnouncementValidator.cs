using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using FluentValidation;
using RoadWatch.Common.Model;

namespace RoadWatch.Private.Models.Validators
{
    public class AnnouncementValidator : AbstractValidator<Announcement>
    {
        public AnnouncementValidator()
        {
            RuleFor(x => x.Title).NotEmpty();
            RuleFor(x => x.Content).NotEmpty();
        }
    }
}