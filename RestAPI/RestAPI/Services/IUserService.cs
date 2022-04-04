using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestAPI.Services
{
    public interface IUserService
    {
        IEnumerable<Models.User> GetUsers(int page, int per_page);
        Models.User GetUser(int id);
        Models.User AddUser(Models.User model);
        void UpdateUser(int id, Models.User model);
        void DeleteUser(int id);
    }
}
