using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestAPI.Services
{
    public interface IUserPermissionService
    {
        Models.UserPermission AddUserPermission(Models.UserPermission model);
        void DeleteUserPermission(Models.UserPermission userPermission);
    }
}
