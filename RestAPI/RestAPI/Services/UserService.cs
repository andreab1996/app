using AutoMapper;
using RestAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestAPI.Services
{
    public class UserService : IUserService
    {
        private readonly AppDbContext context;
        private IMapper mapper;

        public UserService(AppDbContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        public IEnumerable<User> GetUsers(int page, int per_page)
        {
            var users = from p in context.User
                        select new Models.User
                        {
                            Id = p.Id,
                            FirstName = p.FirstName,
                            LastName = p.LastName,
                            Email = p.Email,
                            UserName = p.UserName,
                            Password = p.Password,
                            Status = p.Status,
                            Permissions = new List<Models.UserPermission>()
                        };
            int startPosition = (page - 1) * per_page;
            int endPosition = page * per_page;
            //var permissions = context.UserPermission
            //                        .ToList()
            //                        .GroupBy(tt => tt.UserId)
            //                        .Select(g => new
            //                        {
            //                            UserId = g.Key,
            //                            Permissions = g.Select(a => a.Permission)
            //                        }).ToDictionary(a => a.UserId, es => es.Permissions.ToList());
            //foreach (var t in users)
            //{
            //    if (permissions.ContainsKey(t.Id))
            //        t.Permissions = permissions[t.Id].Select(a => new Models.UserPermission
            //        {
            //            PermissionId = a.Id,
            //            Code = a.Code,
            //            Description = a.Description,
            //        }).ToList();
            //};

            return users.Skip(startPosition).Take(endPosition).ToList();
        }

        public User GetUser(int id)
        {
            var user = context.User.Where(p => p.Id == id).FirstOrDefault();
            var dtoUser = mapper.Map<Db.User, Models.User>(user);
            if (dtoUser == null)
                throw new ItemNotFoundException(nameof(RestAPI.Db.User), id.ToString());

            dtoUser.Permissions = context.UserPermission
                .Where(t => t.UserId == id)
                .Select(t => new Models.UserPermission
                {
                    PermissionId = t.Permission.Id,
                    Code = t.Permission.Code,
                    Description = t.Permission.Description,
                })
                .ToList();
            return dtoUser;
        }

        public User AddUser(User model)
        {
            var dbModel = mapper.Map<Models.User, Db.User>(model);
            context.User.Add(dbModel);
            context.SaveChanges();
            return model;
        }

        public void UpdateUser(int id, User model)
        {
            var dbUser = context.User.Where(p => p.Id == id).FirstOrDefault();
            if (dbUser == null)
                throw new ItemNotFoundException(nameof(RestAPI.Db.User), id.ToString());

            var modelUpdate = mapper.Map<Models.User, Models.UserUpdate>(model);
            mapper.Map<Models.UserUpdate, Db.User>(modelUpdate, dbUser);
            context.SaveChanges();
        }

        public void DeleteUser(int id)
        {
            var dbUser = context.User.Where(p => p.Id == id).FirstOrDefault();
            if (dbUser == null)
                throw new ItemNotFoundException(nameof(RestAPI.Db.User), id.ToString());

            context.User.Remove(dbUser);
            context.SaveChanges();
        }
    }
}
