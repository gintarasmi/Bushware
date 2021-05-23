using NLog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;

namespace Bushware.Utilities
{//singleton

    public class MethodLogger : ILogger
    {
        private static MethodLogger instance;
        private static Logger logger;

        private MethodLogger() { }

        public static MethodLogger GetInstance()
        {
            if (instance == null) instance = new MethodLogger();
            return instance;
        }

        private Logger GetLogger(string theLogger)
        {
            if (MethodLogger.logger == null) MethodLogger.logger = LogManager.GetLogger(theLogger);
            return MethodLogger.logger;
        }

        public void ToLog(int logType, string className, string methodName, string name = "anon", string role = "")
        {
            string message = "Class:" + className + " Method:" + methodName + " Name:" + name + " Role:" + role;
            switch (logType)
            {
                case 0:
                    GetLogger("bushwareLogger").Debug(message);
                    break;
                case 1:
                    GetLogger("bushwareLogger").Error(message);
                    break;
                case 2:
                    GetLogger("bushwareLogger").Info(message);
                    break;
                case 3:
                    GetLogger("bushwareLogger").Warn(message);
                    break;
                default:
                    GetLogger("bushwareLogger").Trace(message);
                    break;
            }
        }
        public static string GetCurrentMethod([CallerMemberName] string callerName = "")
        {
            return callerName;
        }
    }
}
