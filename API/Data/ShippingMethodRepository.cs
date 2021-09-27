using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class ShippingMethodRepository : IShippingMethodRepository
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        public ShippingMethodRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IEnumerable<ShippingMethodDto>> GetShippingMethodAsync()
        {
            return  await _context.ShippingMethods
                .ProjectTo<ShippingMethodDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public async Task<ShippingMethodDto> GetShippingMethodByIdAsync(int id)
        {
            return  await _context.ShippingMethods
                .Where(sm => sm.Id == id)
                .ProjectTo<ShippingMethodDto>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync();
        }
    }
}