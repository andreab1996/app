using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestAPI
{
    public class BaseException : System.Exception
    {
        public BaseException() { }
        public BaseException(string msg) : base(msg) { }
        public BaseException(string msg, Exception innerException) : base(msg, innerException) { }
        public BaseException(string format, params object[] args) : base(string.Format(format, args)) { }
    }

    public class ItemNotFoundException : BaseException
    {
        public ItemNotFoundException(string itemType, object itemId) : base("{0} {1} not found.", itemType ?? "Item", itemId ?? "?") { }
        public ItemNotFoundException(string itemType, object userId, object permissionId) : base("{0} {1} or {2} not found.", itemType ?? "Item", userId ?? "?", permissionId ?? "?") { }
    }
}
