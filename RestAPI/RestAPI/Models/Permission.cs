using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestAPI.Models
{
    public class Permission
    {
        public int Id { get; set; }
        public string Code { get; set; }
        public string Description { get; set; }
        public virtual ICollection<UserPermission> Users { get; set; }
    }
}
