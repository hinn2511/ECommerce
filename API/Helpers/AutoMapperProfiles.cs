using System.Linq;
using API.DTOs;
using API.Entities;
using API.Extensions;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Product, ProductDto>()
                .ForMember(dest => dest.PhotoUrl, opt => opt.MapFrom(
                           src => src.ProductPhotos.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(dest => dest.Category, opt => opt.MapFrom(
                           src => src.Category.CategoryName))
                .ForMember(dest => dest.SubCategory, opt => opt.MapFrom(
                           src => src.SubCategory.SubCategoryName))
                .ForMember(dest => dest.Brand, opt => opt.MapFrom(
                           src => src.Brand.BrandName))
                .ForMember(dest => dest.Collection, opt => opt.MapFrom(
                           src => src.Collection.CollectionName));


            CreateMap<Color, ProductColorDto>();

            CreateMap<ProductColor, ProductColorDto>()
               .ForMember(dest => dest.ColorCode, opt => opt.MapFrom(
                           src => src.Color.ColorCode))
                .ForMember(dest => dest.ColorName, opt => opt.MapFrom(
                           src => src.Color.ColorName))
                .ForMember(dest => dest.HexCode, opt => opt.MapFrom(
                           src => src.Color.HexCode));

            CreateMap<Cart, CartDto>();

            CreateMap<Color, CartDto>()
                .ForMember(dest => dest.ColorCode, opt => opt.MapFrom(
                           src => src.ColorCode))
                .ForMember(dest => dest.ColorName, opt => opt.MapFrom(
                           src => src.ColorName));

            CreateMap<ProductPhoto, ProductPhotoDto>();


            CreateMap<AppUser, MemberDto>()
                .ForMember(dest => dest.Age, opt => opt.MapFrom(
                           src => src.DateOfBirth.CalculateAge()));

            CreateMap<RegisterDto, AppUser>();

            CreateMap<Category, CategoryDto>();

            CreateMap<SubCategory, SubCategoryDto>();

            CreateMap<Cart, CartDetailDto>();

            CreateMap<Promotion, PromotionDto>();

            CreateMap<ShippingMethod, ShippingMethodDto>();

            CreateMap<PaymentMethod, PaymentMethodDto>();

            CreateMap<Order, OrderDto>()
                .ForMember(dest => dest.ShippingMethod, opt => opt.MapFrom(
                           src => src.ShippingMethod))
                .ForMember(dest => dest.PaymentMethod, opt => opt.MapFrom(
                           src => src.PaymentMethod))
                .ForMember(dest => dest.Promotion, opt => opt.MapFrom(
                           src => src.Promotion));
            //.ForMember(dest => dest.OrderDetails, opt => opt.MapFrom(
            //src => src.OrderDetails));
            CreateMap<OrderDetail, OrderDetailDto>()
                .ForMember(dest => dest.ProductCode, opt => opt.MapFrom(
                           src => src.Product.ProductCode))
                .ForMember(dest => dest.ProductName, opt => opt.MapFrom(
                           src => src.Product.ProductName))
                .ForMember(dest => dest.PhotoUrl, opt => opt.MapFrom(
                           src => src.Product.ProductPhotos.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(dest => dest.Price, opt => opt.MapFrom(
                           src => src.Product.Price))
                .ForMember(dest => dest.ColorCode, opt => opt.MapFrom(
                           src => src.Color.ColorCode))
                .ForMember(dest => dest.ColorName, opt => opt.MapFrom(
                           src => src.Color.ColorName));
        }
    }
}