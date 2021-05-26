using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bushware.Utilities
{
    public interface ILogger
    {
        void ToLog(int logType, string message);
    }
}
