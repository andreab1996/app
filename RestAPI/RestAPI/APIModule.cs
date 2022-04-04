using Autofac;
using RestAPI.Services;
using Serilog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestAPI
{
    public class APIModule : Autofac.Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            base.Load(builder);

            builder.RegisterInstance(Log.Logger);

            //builder.RegisterInstance(RT.Comb.Provider.PostgreSql)
            //    .AsImplementedInterfaces();

            builder.RegisterType<PermissionService>()
                .As<IPermissionService>();

            builder.RegisterType<UserService>()
               .As<IUserService>();

            var automapperConfig = new AutoMapper.MapperConfiguration(cfg =>
            {
                cfg.AddProfile<APIMapperProfile>();
            });

            builder.RegisterInstance(automapperConfig.CreateMapper());
        }
    }
}
