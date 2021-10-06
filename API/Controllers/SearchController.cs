using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class SearchController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        public SearchController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet("product")]
        public async Task<ActionResult<IEnumerable<ProductDto>>> GetProductSearchResult([FromQuery] SearchProductParams searchProductParams)
        {

            var products = await _unitOfWork.ProductRepository.GetProductsByNameAsync(searchProductParams);

            Response.AddPaginationHeader(products.CurrentPage, products.PageSize, products.TotalCount, products.TotalPages);

            return Ok(products);

        }
    }
}