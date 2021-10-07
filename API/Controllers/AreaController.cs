using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AreaController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        public AreaController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AreaDto>>> GetAreas()
        {
            var result = await _unitOfWork.AreaRepository.GetAllAreaAsync();
            return Ok(result);
        }

        
    }
}