using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;

namespace API.Entities
{
    public class Article
    {
        public int  Id { get; set; }
        public int PublisherId  { get; set; }
        public int Type { get; set; }
        public string ThumbnailPhotoUrl { get; set; }
        public string Description { get; set; }
        public DateTime PublishedDate { get; set; } = DateTime.UtcNow;
        public AppUser Publisher { get; set; }
        public string Title { get; set; }
        public ICollection<Paragraph> Paragraphs { get; set; }
    }
}