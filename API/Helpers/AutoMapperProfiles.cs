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
            CreateMap<AppUser, MemberDto>()
                .ForMember(dest => dest.Age, opt => opt.MapFrom(
                           src => src.DateOfBirth.CalculateAge()));
            CreateMap<Product, ProductDto>()
                .ForMember(dest => dest.PhotoUrl, opt => opt.MapFrom(
                           src => src.ProductPhotos.FirstOrDefault(x => x.IsMain).Url));
            CreateMap<ProductPhoto, ProductPhotoDto>();
        }
    }
}