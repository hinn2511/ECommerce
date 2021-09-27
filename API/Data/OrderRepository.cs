using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    class OrderRepository : IOrderRepository
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        public OrderRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;

        }
        
        public async Task<OrderDto> GetCustomerOrderByIdAsync(int customerId, int orderId)
        {
            return await _context.Orders.Where( x => x.CustomerId == customerId && x.Id == orderId)
                .Include(o => o.OrderDetails)
                .OrderBy(x => x.Id)
                .ProjectTo<OrderDto>(_mapper.ConfigurationProvider).AsNoTracking()
                .LastOrDefaultAsync();
        }

        public Task<IEnumerable<OrderDetail>> GetOrdersAsync(int customerId, int orderId)
        {
            throw new System.NotImplementedException();
        }

        public async Task<OrderDto> GetCustomerLatestOrderAsync(int customerId)
        {
            return await _context.Orders.Where( x => x.CustomerId == customerId)
                .OrderBy(x => x.Id)
                .ProjectTo<OrderDto>(_mapper.ConfigurationProvider).AsNoTracking()
                .LastOrDefaultAsync();
        }

        public async Task<Order> GetLatestOrderAsync(int customerId)
        {
            return await _context.Orders.Where( x => x.CustomerId == customerId)
                .OrderBy(x => x.Id)
                .LastOrDefaultAsync();
        }

        public async Task<PagedList<OrderDto>> GetOrdersAsync(OrderParams orderParams, int customerId)
        {
            var query = _context.Orders.AsQueryable();
            
            int state =  orderParams.Predicate switch
            {
                "wfa" => 1,
                "delivering" => 2,
                "delivered" => 3,
                "cancelled" => 4,
                _ => 1
            };
            query = query.Where(x => x.CustomerId == customerId && x.State == state);
            return await PagedList<OrderDto>.CreateAsync( query.ProjectTo<OrderDto>(_mapper.ConfigurationProvider),
                 orderParams.PageNumber, orderParams.PageSize);
        }

        public void AddOrder(Order order)
        {
            _context.Orders.Add(order);
        }

        public void UpdateOrder(Order order)
        {
            _context.Entry(order).State = EntityState.Modified;
        }

        public void AddOrderDetail(OrderDetail orderDetail)
        {
            _context.OrderDetails.Add(orderDetail);
        }

        public async Task<Order> GetOrderAsync(int customerId, int orderId)
        {
            return await _context.Orders.Where(x => x.CustomerId == customerId && x.Id == orderId)
                .FirstOrDefaultAsync();
        }
    }
}