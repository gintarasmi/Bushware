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
            var message = String.Format("{0} path: {1} method: {2} user: {3} role: {4}", DateTime.Now, path, method, uName, uRole);
            using (StreamWriter outputFile = new StreamWriter("log.txt", true))
            {
                outputFile.WriteLine(message);
            }
        }
    }
}
