using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace API.Entities
{
    public class Collection
    {
        public int Id { get; set; }
        public string CollectionName { get; set; }
        public DateTime Created { get; set; } = DateTime.UtcNow;

        [JsonIgnore]
        public ICollection<Product> Products { get; set; }
    }
}