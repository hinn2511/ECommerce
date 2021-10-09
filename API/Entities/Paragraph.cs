using System.Text.Json.Serialization;

namespace API.Entities
{
    public class Paragraph
    {
        public int Id { get; set; }
        public int ArticleId { get; set; }

        [JsonIgnore]
        public Article Article { get; set; }
        public string Heading { get; set; }
        public string Content { get; set; }
        public string PhotoUrl { get; set; }
        public string Url { get; set; }
    }
}