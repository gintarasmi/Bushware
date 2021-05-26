using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc.Routing;
using Microsoft.AspNetCore.Routing;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Bushware.Utilities
{
    public class ActionFilterLogger : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            Log(filterContext.HttpContext);
        }

        private void Log(HttpContext httpContext)
        {
            var uName = httpContext.User.Identity.Name;
            var uRole = httpContext.User.Identity.AuthenticationType;
            var method = httpContext.Request.Method;
            var path = httpContext.Request.Path.Value;
            var message = String.Format("Path: {0} method: {1} user: {2} role: {3}", path, method, uName, uRole);
            MethodLogger.GetInstance().ToLog(2, message);
        }
    }
}
