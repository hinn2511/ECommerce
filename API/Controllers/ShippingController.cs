using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ShippingController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        public ShippingController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [Authorize(Policy = "CustomerOnly")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ShippingMethodDto>>> GetShippingMethod()
        {
            var shippingMethod = await _unitOfWork.ShippingMethodRepository.GetShippingMethodAsync();

            return Ok(shippingMethod);

        }

    }
}