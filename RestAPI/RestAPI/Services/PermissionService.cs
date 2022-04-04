using AutoMapper;
using RestAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestAPI.Services
{
    public class PermissionService : IPermissionService
    {
        private readonly AppDbContext context;
        private IMapper mapper;

        public PermissionService(AppDbContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        public IEnumerable<Models.Permission> GetPermissions()
        {
            var permissions = from p in context.Permission
                                    select new Models.Permission
                                    {
                                        Id = p.Id,
                                        Code = p.Code,
                                        Description = p.Description,
                                    };
            return permissions.ToList();
        }

        public Models.Permission GetPermission(int id)
        {
            var permission = context.Permission.Where(p => p.Id == id).FirstOrDefault();
            var dtoPermission = mapper.Map<Db.Permission, Models.Permission>(permission);
            if (permission == null)
                throw new ItemNotFoundException(nameof(RestAPI.Db.Permission), id.ToString());

            return dtoPermission;
        }

        public Models.Permission AddPermission(Models.Permission model)
        {
            var dbModel = mapper.Map<Models.Permission, Db.Permission>(model);
            context.Permission.Add(dbModel);
            context.SaveChanges();
            return model;
        }

        public void UpdatePermission(int id, Models.Permission model)
        {
            var dbPermission = context.Permission.Where(p => p.Id == id).FirstOrDefault();
            if (dbPermission == null)
                throw new ItemNotFoundException(nameof(RestAPI.Db.Permission), id.ToString());

            mapper.Map<Models.Permission, Db.Permission>(model, dbPermission);
            context.SaveChanges();
        }

        public void DeletePermission(int id)
        {
            var dbPermission = context.Permission.Where(p => p.Id == id).FirstOrDefault();
            if (dbPermission == null)
                throw new ItemNotFoundException(nameof(RestAPI.Db.Permission), id.ToString());

            context.Permission.Remove(dbPermission);
            context.SaveChanges();
        }
    }
}
