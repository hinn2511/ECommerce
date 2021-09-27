using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Extensions;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class PromotionController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        public PromotionController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [Authorize(Policy = "CustomerOnly")]
        [HttpGet("redeem/{promotionCode}")]
        public async Task<ActionResult<RedeemResultDto>> Redeem(string promotionCode)
        {
            var customerId = User.GetUserId();
            var customerCart = await _unitOfWork.CartRepository.GetCustomerCart(customerId);

            if (customerCart.Count() == 0) return BadRequest("Không có sản phẩm nào trong giỏ hàng");

            double subTotal = 0;

            foreach (var item in customerCart)
            {
                var product = await _unitOfWork.ProductRepository.FindProductByIdAsync(item.ProductId);
                subTotal = subTotal + product.Price * item.Quantity;
            }

            var promotion = await _unitOfWork.PromotionRepository.GetPromotionByCodeAsync(promotionCode.ToUpper());

            if (promotion == null) return BadRequest("Mã giảm giá không hợp lệ");

            var currentDate = DateTime.UtcNow;

            if (DateTime.Compare(promotion.Start, currentDate) > 0
                || DateTime.Compare(currentDate, promotion.End) > 0)
            {
                return BadRequest("Mã giảm giá không hợp lệ");
            }

            if (promotion.MinOrderTotal > subTotal)
                return BadRequest("Giá trị đơn hàng không đạt tối thiểu");

            double discount = subTotal * promotion.DiscountPercent / 100;

            var result = new RedeemResultDto
            {
                Id = promotion.Id,
                PromotionCode = promotion.PromotionCode,
                Discount = discount >= promotion.MaxDiscountAmount ? promotion.MaxDiscountAmount : discount
            };

            return Ok(result);

        }
    }
}