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
            //Customer
            //Product
            CreateMap<Product, ProductToCustomerDto>()
                .ForMember(dest => dest.PhotoUrl, opt => opt.MapFrom(
                           src => src.ProductPhotos.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(dest => dest.Category, opt => opt.MapFrom(
                           src => src.Category.CategoryName))
                .ForMember(dest => dest.Brand, opt => opt.MapFrom(
                           src => src.Brand.BrandName))
                .ForMember(dest => dest.Collection, opt => opt.MapFrom(
                           src => src.Collection.CollectionName))
                .ForMember(dest => dest.Colors, opt => opt.MapFrom(
                           src => src.ProductColors));
            CreateMap<ProductColor, ProductColorToCustomerDto>()
                .ForMember(dest => dest.ColorCode, opt => opt.MapFrom(
                           src => src.Color.ColorCode))
                .ForMember(dest => dest.HexCode, opt => opt.MapFrom(
                           src => src.Color.HexCode))
                .ForMember(dest => dest.ColorName, opt => opt.MapFrom(
                           src => src.Color.ColorName))
                .ForMember(dest => dest.ProductStockState, opt => opt.MapFrom(
                           src => src.Quantity.GetProductColorState()));

            //Business
            //Product
            CreateMap<Product, ProductDto>()
                .ForMember(dest => dest.PhotoUrl, opt => opt.MapFrom(
                           src => src.ProductPhotos.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(dest => dest.Category, opt => opt.MapFrom(
                           src => src.Category.CategoryName))
                .ForMember(dest => dest.Brand, opt => opt.MapFrom(
                           src => src.Brand.BrandName))
                .ForMember(dest => dest.Collection, opt => opt.MapFrom(
                           src => src.Collection.CollectionName))
                .ForMember(dest => dest.Colors, opt => opt.MapFrom(
                           src => src.ProductColors));
            CreateMap<ProductColor, ProductColorDto>()
                .ForMember(dest => dest.ColorCode, opt => opt.MapFrom(
                           src => src.Color.ColorCode))
                .ForMember(dest => dest.HexCode, opt => opt.MapFrom(
                           src => src.Color.HexCode))
                .ForMember(dest => dest.ColorName, opt => opt.MapFrom(
                           src => src.Color.ColorName))
                .ForMember(dest => dest.ProductStockState, opt => opt.MapFrom(
                           src => src.Quantity.GetProductColorState()));


            CreateMap<ProductPhoto, ProductPhotoDto>();
            //User
            CreateMap<AppUser, MemberDto>()
                .ForMember(dest => dest.Age, opt => opt.MapFrom(
                           src => src.DateOfBirth.CalculateAge()));
            CreateMap<RegisterDto, AppUser>();
            //Category
            CreateMap<Category, CategoryDto>();
        }
    }
}