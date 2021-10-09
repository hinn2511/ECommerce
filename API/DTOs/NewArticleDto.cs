using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class NewArticleDto
    {
        public int Type { get; set; }
        public int PubliserId { get; set; }
        public string Description { get; set; }
        public string ThumbnailPhotoUrl { get; set; }
        public DateTime PublishedDate { get; set; }
        public string Title { get; set; }
        public ICollection<NewParagraphDto> Paragraphs { get; set; }
    }
}