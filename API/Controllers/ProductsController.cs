using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{

    public class ProductsController : BaseApiController
    {
        private readonly IProductRepository _productRepository;
        private readonly IMapper _mapper;
        public ProductsController(IProductRepository productRepository, IMapper mapper)
        {
            _mapper = mapper;
            _productRepository = productRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductDto>>> GetProducts()
        {
            var products = await _productRepository.GetAllProductsForCustomerAsync();

            return Ok(products);

        }

        [HttpGet("{productName}")]
        public async Task<ActionResult<ProductDto>> GetProduct(string productName)
        {
            return await _productRepository.GetProductForCustomerAsync(productName);
        }
    }
}