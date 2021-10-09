using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface IArticleRepository
    {
        Task<PagedList<ArticleDto>> GetArticlesAsync(ArticleParams articleParams);
        Task<ArticleDto> GetArticleById(int id);
        void AddArticle(Article article);
        void AddParagraph(Paragraph paragraph);
    }
}