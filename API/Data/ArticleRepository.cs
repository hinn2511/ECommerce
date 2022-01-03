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
            var query = _context.Articles.AsQueryable();

            int type = articleParams.Type switch
            {
                "all" => 0,
                "news" => 1,
                "promotions" => 2,
                _ => 0
            };

            if (type == 0)
                query = query.Where(article => article.Type == 1 || article.Type == 2)
                    .OrderByDescending(article => article.PublishedDate);
            else
                query = query.Where(article => article.Type == type)
                    .OrderByDescending(article => article.PublishedDate);

            return await PagedList<ArticleDto>.CreateAsync(query.ProjectTo<ArticleDto>(_mapper.ConfigurationProvider),
                 articleParams.PageNumber, articleParams.PageSize);
        }

        public async Task<IEnumerable<ArticleDto>> GetRelatedArticles(int type, int id)
        {
            return await _context.Articles
                .Where(a => a.Type == type && a.Id != id)
                .OrderByDescending(a => a.PublishedDate)
                .Take(2)
                .ProjectTo<ArticleDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }
    }
}