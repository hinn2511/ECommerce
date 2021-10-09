using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class ArticleRepository : IArticleRepository
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        public ArticleRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public void AddArticle(Article article)
        {
            _context.Articles.Add(article);
        }

        public void AddParagraph(Paragraph paragraph)
        {
            _context.Paragraphs.Add(paragraph);
        }


        public async Task<ArticleDto> GetArticleById(int id)
        {
            return await _context.Articles
                .Where(a => a.Id == id)
                .ProjectTo<ArticleDto>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync();
        }

        public async Task<PagedList<ArticleDto>> GetArticlesAsync(ArticleParams articleParams)
        {
            var articles = _context.Articles.AsQueryable();

            int type =  articleParams.Type switch
            {
                "news" => 1,
                "promotions" => 2,
                "product" => 3,
                _ => 1
            };

            articles = articles.Where(article => article.Type == type).OrderByDescending(article => article.PublishedDate);

            return await PagedList<ArticleDto>.CreateAsync( articles.ProjectTo<ArticleDto>(_mapper.ConfigurationProvider),
                 articleParams.PageNumber, articleParams.PageSize);
        }
    }
}