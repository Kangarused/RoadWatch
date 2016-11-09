using System;
using System.Linq.Expressions;
using RoadWatch.Common.Model;
using ServiceStack.OrmLite;

namespace RoadWatch.Private.Database.OrmLiteInfrastructure
{
    public static class SqlExpressionExtensions
    {
        public static SqlExpression<T> ApplyPaging<T>(this SqlExpression<T> items, PagingFilter filter,
            Expression<Func<T, object>> defaultOrder, bool isDescendingDefaultOrder = false)
        {
            if (!string.IsNullOrEmpty(filter.OrderColumn))
            {
                if (filter.OrderDirection == OrderDirection.ASC)
                {
                    items.OrderBy(filter.OrderColumn);
                }
                else
                {
                    items.OrderByDescending(filter.OrderColumn);

                }
            }
            else
            {
                if (isDescendingDefaultOrder)
                {
                    items.OrderByDescending(defaultOrder);
                }
                else
                {
                    items.OrderBy(defaultOrder);

                }
            }

            items.Skip((filter.Page - 1)*filter.PageSize).Take(filter.PageSize);

            return items;
        }
    }
}
