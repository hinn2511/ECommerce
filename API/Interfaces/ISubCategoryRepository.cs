using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;

namespace API.Interfaces
{
    public interface ISubCategoryRepository
    {
        Task<IEnumerable<SubCategoryDto>> GetAllSubCategoryByCategoryIdAsync(int id);
        Task<SubCategoryDto> GetSubCategoryByIdAsync(int id);
    }
}