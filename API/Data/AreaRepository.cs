using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class AreaRepository : IAreaRepository
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        public AreaRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IEnumerable<AreaDto>> GetAllAreaAsync()
        {
            return await _context.Areas
                .ProjectTo<AreaDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }
    }
}
