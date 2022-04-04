using AutoMapper;
using RestAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestAPI.Services
{
    public class UserPermissionService : IUserPermissionService
    {
        private readonly AppDbContext context;
        private IMapper mapper;

        public UserPermissionService(AppDbContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        public UserPermission AddUserPermission(UserPermission model)
        {
            var userPermission = new Db.UserPermission
            {
                UserId = model.UserId,
                PermissionId = model.PermissionId
            };

            context.UserPermission.Add(userPermission);

            context.SaveChanges();
            return model;
        }

        public void DeleteUserPermission(UserPermission userPermission)
        {
            var dbUserPermission = context.UserPermission
                           .Where(t => t.UserId == userPermission.UserId && t.PermissionId == userPermission.PermissionId)
                           .FirstOrDefault();

            if (dbUserPermission == null)
                throw new ItemNotFoundException(nameof(RestAPI.Db.UserPermission), userPermission.UserId.ToString(), userPermission.PermissionId.ToString());

            context.UserPermission.Remove(dbUserPermission);
            context.SaveChanges();
        }
    }
}
