using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class OrderController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        public OrderController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [Authorize(Policy = "CustomerOnly")]
        [HttpPost("checkout")]
        public async Task<ActionResult<OrderDto>> Checkout(CheckoutDto checkoutDto)
        {
            var customerId = User.GetUserId();

            var customerCart = await _unitOfWork.CartRepository.GetCustomerCart(customerId);

            if (customerCart.Count() == 0) return BadRequest("Không có sản phẩm nào trong giỏ hàng");

            var order = new Order
            {
                CustomerId = customerId,
                Date = DateTime.UtcNow,
                FullName = checkoutDto.FullName,
                Destination = checkoutDto.Destination,
                PhoneNumber = checkoutDto.PhoneNumber,
                ShippingMethodId = checkoutDto.ShippingMethodId,
                PaymentMethodId = checkoutDto.PaymentMethodId,
                PromotionId = checkoutDto.PromotionId,
                State = 1,
                Discount = 0,
                SubTotal = 0
            };
            _unitOfWork.OrderRepository.AddOrder(order);

            if (await _unitOfWork.Complete())
            {
                var orderAdded = await _unitOfWork.OrderRepository.GetLatestOrderAsync(customerId);
                double subTotal = 0;
                foreach (var item in customerCart)
                {
                    var orderDetail = new OrderDetail
                    {
                        OrderId = orderAdded.Id,
                        ProductId = item.ProductId,
                        ColorId = item.ColorId == null ? null : item.ColorId,
                        Quantity = item.Quantity
                    };
                    _unitOfWork.OrderRepository.AddOrderDetail(orderDetail);
                    _unitOfWork.CartRepository.RemoveCartItem(item);
                    var product = await _unitOfWork.ProductRepository.FindProductByIdAsync(item.ProductId);
                    subTotal = subTotal + product.Price * item.Quantity;
                    if (await _unitOfWork.Complete()) continue;
                }

                orderAdded.SubTotal = subTotal;

                double discount = 0;
                var promotion = await _unitOfWork.PromotionRepository.GetPromotionByIdAsync(checkoutDto.PromotionId);

                if (checkoutDto.PromotionId != null)
                {
                    discount = subTotal * promotion.DiscountPercent / 100;
                    orderAdded.Discount = discount >= promotion.MaxDiscountAmount ? promotion.MaxDiscountAmount : discount;
                }
                else
                    orderAdded.Discount = discount;

                _unitOfWork.OrderRepository.UpdateOrder(orderAdded);

                if (await _unitOfWork.Complete())
                {
                    var result = await _unitOfWork.OrderRepository.GetCustomerLatestOrderAsync(customerId);
                    return Ok(result);
                }

            }
            return BadRequest("Đã có lỗi xảy ra khi tiến hành thanh toán");

        }

        [Authorize(Policy = "CustomerOnly")]
        [HttpGet("{orderId}/detail")]
        public async Task<ActionResult<OrderDto>> GetOrderDetail(int orderId)
        {
            var customerId = User.GetUserId();

            var result = await _unitOfWork.OrderRepository.GetCustomerOrderByIdAsync(customerId, orderId);

            return result;
        }

        [Authorize(Policy = "CustomerOnly")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrderDto>>> GetOrders([FromQuery] OrderParams orderParams)
        {
            var customerId = User.GetUserId();

            var result = await _unitOfWork.OrderRepository.GetOrdersAsync(orderParams, customerId);

            Response.AddPaginationHeader(result.CurrentPage, result.PageSize, result.TotalCount, result.TotalPages);

            return Ok(result);
        }

        [Authorize(Policy = "CustomerOnly")]
        [HttpPost("cancel/{orderId}")]
        public async Task<ActionResult<IEnumerable<OrderDto>>> CancelOrder(int orderId)
        {
            var customerId = User.GetUserId();

            var order = await _unitOfWork.OrderRepository.GetOrderAsync(customerId, orderId);

            if (order == null) return BadRequest("Đơn hàng không tồn tại");

            if (order.State == 1)
            {
                order.State = 4;
                _unitOfWork.OrderRepository.UpdateOrder(order);
                if (await _unitOfWork.Complete()) return Ok();
            }
            return BadRequest("Đã có lỗi xảy ra");
        }



    }
}