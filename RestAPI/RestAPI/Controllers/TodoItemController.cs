using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using RestAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TodoItemController : ControllerBase
    {
        private readonly ILogger<WeatherForecastController> _logger;

        public TodoItemController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public List<TodoItem> Get()
        {
            var lists = new List<TodoItem>();
            lists.Add(new TodoItem
            {
                Id = 1,
                Name = "Task1",
                IsComplete = false
            });
            return lists;
        }
    }
}
