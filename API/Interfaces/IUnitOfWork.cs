using System.Threading.Tasks;

namespace API.Interfaces
{
    public interface IUnitOfWork
    {
        IUserRepository UserRepository { get; }
        IProductRepository ProductRepository { get; }
        IFavoriteRepository FavoriteRepository { get; }
        ICartRepository CartRepository { get; }
        IColorRepository ColorRepository { get; }
        Task<bool> Complete();
        bool HasChanges();

    }
}