using System.Threading.Tasks;

namespace API.Interfaces
{
    public interface IUnitOfWork
    {
        IUserRepository UserRepository { get; }
        IProductRepository ProductRepository { get; }
        ICategoryRepository CategoryRepository { get; }
        ISubCategoryRepository SubCategoryRepository { get; }
        IFavoriteRepository FavoriteRepository { get; }
        ICartRepository CartRepository { get; }
        IColorRepository ColorRepository { get; }
        IOrderRepository OrderRepository { get; }
        IPromotionRepository PromotionRepository { get; }
        IShippingMethodRepository ShippingMethodRepository { get; }
        IPaymentMethodRepository PaymentMethodRepository { get; }
        IAreaRepository AreaRepository { get; }
        Task<bool> Complete();
        bool HasChanges();

    }
}