using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class PaymentMethodRepository : IPaymentMethodRepository
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        public PaymentMethodRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;

        }

        public async Task<IEnumerable<PaymentMethodDto>> GetAllPaymentMethodsAsync()
        {
            return  await _context.PaymentMethods
                .ProjectTo<PaymentMethodDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public Task<PaymentMethodDto> GetPaymentMethodByIdAsync(int id)
        {
            throw new System.NotImplementedException();
        }
    }
}