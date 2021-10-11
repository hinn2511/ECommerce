using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ArticleController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public ArticleController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        [HttpPost]
        public async Task<ActionResult<ArticleDto>> AddArticle([FromBody] NewArticleDto newArticleDto)
        {
            var article = _mapper.Map<Article>(newArticleDto);

            var userId = User.GetUserId();

            article.PublisherId = userId;

            article.PublishedDate = DateTime.UtcNow;

            _unitOfWork.ArticleRepository.AddArticle(article);

            if (await _unitOfWork.Complete())
            {
                return Ok(_mapper.Map<ArticleDto>(article));
            }

            return BadRequest("Đã có lỗi xảy ra khi thêm bài viết");
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ArticleDto>>> GetArticles([FromQuery] ArticleParams articleParams)
        {
            var result = await _unitOfWork.ArticleRepository.GetArticlesAsync(articleParams);

            Response.AddPaginationHeader(result.CurrentPage, result.PageSize, result.TotalCount, result.TotalPages);

            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ArticleDto>> GetArticle(int id)
        {
            var result = await _unitOfWork.ArticleRepository.GetArticleById(id);
            return Ok(result);
        }

        [HttpGet("related/{id}")]
        public async Task<ActionResult<IEnumerable<ArticleDto>>> GetRelatedArticles(int id)
        {
            var article = await _unitOfWork.ArticleRepository.GetArticleById(id);

            var result = await _unitOfWork.ArticleRepository.GetRelatedArticles(article.Type, id);

            return Ok(result);
        }
    }
}