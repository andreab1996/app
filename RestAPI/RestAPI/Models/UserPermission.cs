using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestAPI.Models
{
    public class UserPermission
    {
        public int UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int PermissionId { get; set; }
        public string Code { get; set; }
        public string Description { get; set; }

        public User User { get; set; }
        public Permission Permission { get; set; }
    }
}
