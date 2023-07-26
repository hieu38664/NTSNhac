using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Models
{
    public class PaginationInfor
    {
        public int PageSize { get; set; }
        public int PageNumber { get; set; }
        public int total { get; set; }
        public List<NhacInfor> nhacInfors { get; set; }
        public string keyword { get; set; }
        public bool? status { get; set; }
        public int type { get; set; }
        public PaginationInfor() { 
            nhacInfors = new List<NhacInfor>();
        }


    }
}
