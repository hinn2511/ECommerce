using System.Threading.Tasks;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;

namespace API.Interfaces
{
    public interface IProductPhotoService
    {
        Task<ImageUploadResult> AddProductPhotoAsync(IFormFile file);
        Task<DeletionResult> DeleteProductPhotoAsync(string publicId);
    }
}