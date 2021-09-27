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
    public class SubCategoryRepository : ISubCategoryRepository
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        public SubCategoryRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;

        }
        public async Task<IEnumerable<SubCategoryDto>> GetAllSubCategoryByCategoryIdAsync(int id)
        {
            return await _context.SubCategories
                .Where(sc => sc.CategoryId == id)
                .ProjectTo<SubCategoryDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public Task<SubCategoryDto> GetSubCategoryByIdAsync(int id)
        {
            throw new System.NotImplementedException();
        }
    }
}