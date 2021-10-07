using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;

namespace API.Interfaces
{
    public interface IAreaRepository
    {
        Task<IEnumerable<AreaDto>> GetAllAreaAsync();
    }
}