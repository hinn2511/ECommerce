using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    internal class ColorRepository : IColorRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public ColorRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<Color> FindColorByCodeAsyc(string colorCode)
        {
            return await _context.Colors
                .FirstOrDefaultAsync(c => c.ColorCode == colorCode);
        }
    }
}