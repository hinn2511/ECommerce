using System.Diagnostics.Contracts;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class PromotionRepository : IPromotionRepository
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        public PromotionRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<PromotionDto> GetPromotionByCodeAsync(string code)
        {
            return await _context.Promotions
             .Where(p => p.PromotionCode == code.ToUpper())
             .ProjectTo<PromotionDto>(_mapper.ConfigurationProvider)
             .SingleOrDefaultAsync();
        }

        public async Task<PromotionDto> GetPromotionByIdAsync(int? id)
        {
            return await _context.Promotions
             .Where(p => p.Id == id)
             .ProjectTo<PromotionDto>(_mapper.ConfigurationProvider)
             .SingleOrDefaultAsync();
        }
    }
}