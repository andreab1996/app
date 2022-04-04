using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestAPI
{
    public class APIMapperProfile : Profile
    {
        public APIMapperProfile()
        {
            CreateMap<Db.Permission, Models.Permission>().ReverseMap();

            CreateMap< Models.Permission, Db.Permission>().ReverseMap();

            CreateMap<Db.User, Models.User>().ReverseMap();

            CreateMap<Db.User, Models.UserUpdate>().ReverseMap();

            CreateMap<Models.User, Models.UserUpdate>().ReverseMap();

            CreateMap<Db.UserPermission, Models.UserPermission>().ReverseMap();
        }
    }
}
