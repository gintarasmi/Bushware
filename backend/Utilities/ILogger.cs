namespace Bushware.Utilities
{
    public interface ILogger
    {
        void ToLog(int logType, string className, string methodName, string name = "anon", string role = "");
    }
}