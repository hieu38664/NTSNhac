using System;
using System.Collections.Generic;

namespace Model.Entities
{
    public partial class Nhac
    {
        public string Id { get; set; } = null!;
        public string? ThoigianPhat { get; set; }
        public DateTime? NgayPhat { get; set; }
        public string? NoiDung { get; set; }
        public bool? TinhTrang { get; set; }
        public string? Thang { get; set; }
        public string? Ngay { get; set; }
        public int? Type { get; set; }
        public DateTime Tgian { get; set; }
        public string? FileId { get; set; }
        //public List<string> NgayDaChon { get; set; }
    }
}
