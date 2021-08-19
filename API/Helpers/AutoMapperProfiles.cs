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
                           src => src.ProductColors.Select(c => c.Color)));
            CreateMap<Color, ProductColorToCustomerDto>();


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
                           src => src.ProductColors.Select(c => c.Color)));
                CreateMap<Color, ProductColorDto>();

            
            CreateMap<ProductPhoto, ProductPhotoDto>();
        //User
            CreateMap<AppUser, MemberDto>()
                .ForMember(dest => dest.Age, opt => opt.MapFrom(
                           src => src.DateOfBirth.CalculateAge()));
        
        //Category
            CreateMap<Category, CategoryDto>();
        }
    }
}