using Microsoft.AspNetCore.Http;
using Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service
{
    public interface INhacService
    {
        List<NhacInfor> getNhac();//input..
        string addNhac(NhacInfor nhacInfor);//models input
        string updateNhac(NhacInfor nhacInfor);//models input...
        Boolean deleteNhac(string id);//models id
        PaginationInfor paginationNhac(PaginationInfor paginationInfor);
        NhacInfor getNhacById(string id);
        Task<string> uploadNhac(IFormFile files);

    }
}
