using System.Threading.Tasks;

namespace API.Interfaces
{
    public interface IUnitOfWork
    {
        IUserRepository UserRepository { get; }
        IProductRepository ProductRepository { get; }
        ICustomerFavoriteRepository CustomerFavoriteRepository { get; }
        Task<bool> Complete();
        bool HasChanges();

    }
}