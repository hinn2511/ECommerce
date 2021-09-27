using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class CategoriesController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        public CategoriesController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CategoryDto>>> GetCategories()
        {
            var result = await _unitOfWork.CategoryRepository.GetAllCategoryAsync();
            return Ok(result);
        }

        [HttpGet("{categoryId}/sub-categories")]
        public async Task<ActionResult<IEnumerable<CategoryDto>>> GetSubCategories(int categoryId)
        {
            var result = await _unitOfWork.SubCategoryRepository.GetAllSubCategoryByCategoryIdAsync(categoryId);
            return Ok(result);
        }
    }
}