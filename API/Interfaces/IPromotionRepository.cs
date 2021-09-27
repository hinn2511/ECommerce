using System.Threading.Tasks;
using API.DTOs;

namespace API.Interfaces
{
    public interface IPromotionRepository 
    {
        Task<PromotionDto> GetPromotionByIdAsync(int? id);
        Task<PromotionDto> GetPromotionByCodeAsync(string code);
    }
}