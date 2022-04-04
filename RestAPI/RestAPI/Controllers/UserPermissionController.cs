using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using RestAPI.Models;
using RestAPI.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserPermissionController : ControllerBase
    {
        private readonly ILogger<PermissionController> logger;
        private readonly AppDbContext context;
        private readonly IMapper mapper;
        private readonly IUserPermissionService service;

        public UserPermissionController(AppDbContext context, IMapper mapper, IUserPermissionService service, ILogger<PermissionController> logger)
        {
            this.context = context;
            this.mapper = mapper;
            this.service = service;
            this.logger = logger;
        }


        [HttpPost]
        public ActionResult Post([FromBody] Models.UserPermission model)
        {
            try
            {
                return Ok(service.AddUserPermission(model));
            }
            catch (Exception ex)
            {
                logger.LogError("Error occurred.", ex);
                return BadRequest();
            }
        }

        [HttpDelete]
        public ActionResult<Models.UserPermission> DeleteUserPermission([FromBody] UserPermission userPermission)
        {
            try
            {
                service.DeleteUserPermission(userPermission);
                return Ok();
            }
            catch (Exception ex)
            {
                logger.LogError("Error occurred.", ex);
                throw;
            }
        }
    }
}
