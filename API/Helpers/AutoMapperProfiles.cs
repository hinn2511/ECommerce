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

            CreateMap<ProductColor, ProductColorDto>();
                
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
        }
    }
}