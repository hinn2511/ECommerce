using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface IOrderRepository
    {
        Task<OrderDto> GetCustomerOrderByIdAsync(int customerId, int orderId);
        Task<OrderDto> GetCustomerLatestOrderAsync(int customerId);
        Task<Order> GetLatestOrderAsync(int customerId);
        Task<Order> GetOrderAsync(int customerId, int orderId);
        Task<PagedList<OrderDto>> GetOrdersAsync(OrderParams orderParams, int customerId);
        void AddOrder(Order order);
        void UpdateOrder(Order order);
        void AddOrderDetail(OrderDetail orderDetail);
    }
}