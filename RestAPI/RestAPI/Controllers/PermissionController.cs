using AutoMapper;
using Microsoft.AspNetCore.Cors;
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
    [EnableCors("AllowOrigin")]
    [ApiController]
    [Route("api/[controller]")]
    public class PermissionController : ControllerBase
    {
        private readonly ILogger<PermissionController> logger;
        private readonly AppDbContext context;
        private readonly IMapper mapper;
        private readonly IPermissionService service;

        public PermissionController(AppDbContext context, IMapper mapper, IPermissionService service, ILogger<PermissionController> logger)
        {
            this.context = context;
            this.mapper = mapper;
            this.service = service;
            this.logger = logger;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Models.Permission>> Get()
        {
            try
            {
                return Ok(service.GetPermissions());
            }
            catch (Exception ex)
            {
                logger.LogError("Error occurred.", ex);
                throw;
            }
        }

        [HttpGet("{id}")]
        public ActionResult<Models.Permission> Get(int id)
        {
            try
            {
                var data = service.GetPermission(id);
                return Ok(data);
            }
            catch (Exception ex)
            {
                logger.LogError("Error occurred.", ex);
                throw;
            }
        }

        [HttpPost]
        public ActionResult Post([FromBody] Models.Permission model)
        {
            try
            {
                return Ok(service.AddPermission(model));
            }
            catch (Exception ex)
            {
                logger.LogError("Error occurred.", ex);
                throw;
            }
        }

        [HttpPut("{id}")]
        public ActionResult<Models.Permission> Put(int id, [FromBody] Models.Permission model)
        {
            try
            {
                service.UpdatePermission(id, model);
                return Ok(service.GetPermission(id));
            }
            catch (Exception ex)
            {
                logger.LogError("Error occurred.", ex);
                throw;
            }
        }

        [HttpDelete("{id}")]
        public ActionResult<Models.Permission> DeletePermission(int id)
        {
            try
            {
                service.DeletePermission(id);
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
