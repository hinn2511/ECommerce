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
    public class PaymentController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        public PaymentController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        
        [Authorize(Policy = "CustomerOnly")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ShippingMethodDto>>> GetPaymentMethodCustomer()
        {
            var paymentMethod = await _unitOfWork.PaymentMethodRepository.GetAllPaymentMethodsAsync();

            return Ok(paymentMethod);

        }
    }
}