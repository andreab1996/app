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
    public class UserController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;
        private readonly IUserService _service;

        public UserController(ILogger<UserController> logger, AppDbContext context, IMapper mapper, IUserService service)
        {
            _logger = logger;
            _context = context;
            _mapper = mapper;
            _service = service;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Models.User>> Get(int page = 1, int per_page = 10)
        {
            try
            {
                return Ok(_service.GetUsers(page, per_page));
            }
            catch (Exception ex)
            {
                _logger.LogError("Error occurred.", ex);
                throw;
            }
        }

        [HttpGet("{id}")]
        public ActionResult<Models.User> Get(int id)
        {
            try
            {
                var data = _service.GetUser(id);
                return Ok(data);
            }
            catch (Exception ex)
            {
                _logger.LogError("Error occurred.", ex);
                throw;
            }
        }

        [HttpPost]
        public ActionResult Post([FromBody] Models.User model)
        {
            try
            {
                return Ok(_service.AddUser(model));
            }
            catch (Exception ex)
            {
                _logger.LogError("Error occurred.", ex);
                throw;
            }
        }

        [HttpPut("{id}")]
        public ActionResult<Models.User> Put(int id, [FromBody] Models.User model)
        {
            try
            {
                _service.UpdateUser(id, model);
                return Ok(_service.GetUser(id));
            }
            catch (Exception ex)
            {
                _logger.LogError("Error occurred.", ex);
                throw;
            }
        }

        [HttpDelete("{id}")]
        public ActionResult<Models.User> DeletePermission(int id)
        {
            try
            {
                _service.DeleteUser(id);
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError("Error occurred.", ex);
                throw;
            }
        }
    }
}
