using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using AutoMapper;

namespace API.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public UnitOfWork(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public IUserRepository UserRepository => new UserRepository(_context, _mapper);
        public IProductRepository ProductRepository => new ProductRepository(_context, _mapper);
        public ICategoryRepository CategoryRepository => new CategoryRepository(_context, _mapper);
        public ISubCategoryRepository SubCategoryRepository => new SubCategoryRepository(_context, _mapper);
        public IFavoriteRepository FavoriteRepository => new FavoriteRepository(_context, _mapper);
        public ICartRepository CartRepository => new CartRepository(_context, _mapper);
        public IColorRepository ColorRepository => new ColorRepository(_context, _mapper);
        public IOrderRepository OrderRepository => new OrderRepository(_context, _mapper);
        public IPromotionRepository PromotionRepository => new PromotionRepository(_context, _mapper);
        public IShippingMethodRepository ShippingMethodRepository => new ShippingMethodRepository(_context, _mapper);
        public IPaymentMethodRepository PaymentMethodRepository => new PaymentMethodRepository(_context, _mapper);
        public IAreaRepository AreaRepository => new AreaRepository(_context, _mapper);

        public async Task<bool> Complete()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public bool HasChanges()
        {
            return _context.ChangeTracker.HasChanges();
        }
    }
}