using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;

namespace API.Interfaces
{
    public interface IShippingMethodRepository
    {
        Task<IEnumerable<ShippingMethodDto>> GetShippingMethodAsync();
        Task<ShippingMethodDto> GetShippingMethodByIdAsync(int id);
    }
}