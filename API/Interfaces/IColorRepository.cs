using System.Threading.Tasks;
using API.Entities;

namespace API.Interfaces
{
    public interface IColorRepository
    {
        Task<Color> FindColorByCodeAsyc(string colorCode);
    }
}