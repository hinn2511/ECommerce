using System;
using System.Collections.Generic;

namespace API.DTOs
{
    public class ArticleDto
    {
        public int  Id { get; set; }
        public int Type { get; set; }
        public string Description { get; set; }
        public string ThumbnailPhotoUrl { get; set; }
        public string PublisherName { get; set; }
        public DateTime PublishedDate { get; set; }
        public string Title { get; set; }
        public ICollection<ParagraphDto> Paragraphs { get; set; }
    }
}