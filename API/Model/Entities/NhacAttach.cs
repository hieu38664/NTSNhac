using System;
using System.Collections.Generic;

namespace Model.Entities
{
    public partial class NhacAttach
    {
        public string Id { get; set; } 
        public string FileName { get; set; } 
        public string FileSize { get; set; } 
        public string? Path { get; set; }
    }
}
