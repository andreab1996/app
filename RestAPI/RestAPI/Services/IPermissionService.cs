using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestAPI.Services
{
    public interface IPermissionService
    {
        IEnumerable<Models.Permission> GetPermissions();
        Models.Permission GetPermission(int id);
        Models.Permission AddPermission(Models.Permission model);
        void UpdatePermission(int id, Models.Permission model);
        void DeletePermission(int id);
    }
}
