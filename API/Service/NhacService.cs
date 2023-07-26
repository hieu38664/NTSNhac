using Microsoft.AspNetCore.Http;
using Model.Entities;
using Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service
{
    public class NhacService : INhacService
    {
        private readonly ApiContext _apiContext;
        public NhacService(ApiContext apiContext)
        {
            _apiContext = apiContext;
        }
        public List<NhacInfor> getNhac()
        {
            var model = _apiContext.Nhac
                .Select(x => new NhacInfor
                {
                    Id = x.Id,
                    NoiDung = x.NoiDung,
                    ThoigianPhat = x.ThoigianPhat,
                    TinhTrang = x.TinhTrang,
                    Ngay = x.Ngay,
                    Type = x.Type,
                    Tgian = x.Tgian,
                })
                .OrderByDescending(e => e.Tgian)//sắp xếp giảm dần, bản ghi mới nhất lên trên
                                                //.OrderBy(e => e.Date)// ngược lại cái trên
                .ToList();
            return model;
        }

        public string addNhac(NhacInfor nhacInfor)
        {
            Nhac newNhac = new Nhac
            {
                Id = Guid.NewGuid().ToString(),
                ThoigianPhat = nhacInfor.ThoigianPhat,
                //NgayPhat = nhacInfor.NgayPhat,
                NoiDung = nhacInfor.NoiDung,
                TinhTrang = nhacInfor.TinhTrang,
                //Thang = nhacInfor.Thang,
                Ngay = nhacInfor.Ngay,
                Type = nhacInfor.Type,
                Tgian = DateTime.Now,
                FileId = nhacInfor.FileId,

            };
            _apiContext.Nhac.Add(newNhac);
            _apiContext.SaveChanges();
            return "Thêm Nhac thành công!";
        }


        public bool deleteNhac(string id)
        {
            Nhac deleteNhac = _apiContext.Nhac.FirstOrDefault(n => n.Id == id);
            if (deleteNhac == null)
            {
                return false;
            }

            _apiContext.Nhac.Remove(deleteNhac);

            _apiContext.SaveChanges();

            return true;
        }

        public string updateNhac(NhacInfor nhacInfor)
        {
            Nhac editNhac = _apiContext.Nhac.FirstOrDefault(n => n.Id == nhacInfor.Id);
            if (editNhac == null)
            {
                return "Bản ghi không tồn tại trong cơ sở dữ liệu";
            }

            editNhac.ThoigianPhat = nhacInfor.ThoigianPhat;
            editNhac.NgayPhat = nhacInfor.NgayPhat;
            editNhac.NoiDung = nhacInfor.NoiDung;
            editNhac.TinhTrang = nhacInfor.TinhTrang;
            //existingNhac.Thang = nhacInfor.Thang;
            editNhac.Ngay = nhacInfor.Ngay;
            //.Split(',').ToList()
            editNhac.Type = nhacInfor.Type;
            //editNhac.Tgian = ;

            //editNhac.NgayDaChon = nhacInfor.Ngay.Split(',').ToList();

            _apiContext.SaveChanges();

            return "Cập nhật Nhac thành công!";
        }


        public NhacInfor getNhacById(string id)
        {
            var model = _apiContext.Nhac
                .Where(n => n.Id == id)
                .Select(x => new NhacInfor
                {
                    Id = x.Id,
                    NoiDung = x.NoiDung,
                    ThoigianPhat = x.ThoigianPhat,
                    TinhTrang = x.TinhTrang,
                    Ngay = x.Ngay,
                    Type = x.Type
                })
                .FirstOrDefault();
            return model;
        }

        public PaginationInfor paginationNhac(PaginationInfor paginationInfor)
        {

            int startIndex = (paginationInfor.PageNumber - 1) * paginationInfor.PageSize;
            //int endIndex = startIndex + nhacInfor.PageSize;

            List<NhacInfor> allNhacs = _apiContext.Nhac
                .Select(n => new NhacInfor
                {
                    Id = n.Id,
                    ThoigianPhat = n.ThoigianPhat,
                    //NgayPhat = n.NgayPhat,
                    NoiDung = n.NoiDung,
                    TinhTrang = n.TinhTrang,
                    //Thang = n.Thang,
                    Ngay = n.Ngay,
                    Type = n.Type,
                    Tgian = n.Tgian,
                })
                .OrderBy(e => e.Tgian)
                .ToList();

            if (!string.IsNullOrEmpty(paginationInfor.keyword))
            {
                allNhacs = allNhacs.Where(n => n.Id.Contains(paginationInfor.keyword) ||
                            n.ThoigianPhat != null && n.ThoigianPhat.Contains(paginationInfor.keyword) ||
                            n.NoiDung != null && n.NoiDung.Contains(paginationInfor.keyword) ||
                            n.Ngay.Contains(paginationInfor.keyword)).ToList();
            }

            if (paginationInfor.status.HasValue)
            {
                allNhacs = allNhacs.Where(n => paginationInfor.status.Equals(n.TinhTrang)).ToList();
            }

            if (paginationInfor.type > 0)
            {
                allNhacs = allNhacs.Where(n => paginationInfor.type.Equals(n.Type)).ToList();
            }

            PaginationInfor paginationInfor1 = new PaginationInfor();
            paginationInfor1.total = allNhacs.Count;


            List<NhacInfor> paginatedNhacs = allNhacs.Skip(startIndex).Take(paginationInfor.PageSize).ToList();
            paginationInfor1.nhacInfors = paginatedNhacs;

            return paginationInfor1;
        }

        public async Task<string> uploadNhac(IFormFile files)
        {
            string uploadFolder = "D:\\NTS\\uploads";
            try
            {
                if (files.Length > 0)
                {
                    string fileName = Path.GetFileName(files.FileName);
                    string filePath = Path.Combine(uploadFolder, fileName);

                    // Xác định đường dẫn đầy đủ của thư mục tải lên tệp
                    string fullUploadPath = Path.Combine(Directory.GetCurrentDirectory(), uploadFolder);

                    // Kiểm tra nếu thư mục đích không tồn tại, tạo mới nếu cần
                    if (!Directory.Exists(fullUploadPath))
                    {
                        Directory.CreateDirectory(fullUploadPath);
                    }

                    // Lưu tệp vào thư mục tải lên tệp
                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await files.CopyToAsync(stream);
                    }

                    NhacAttach nhacAttach = new NhacAttach()
                    {
                        Id = Guid.NewGuid().ToString(),
                        FileName = fileName,
                        Path = filePath,
                        FileSize = "2",
                    };
                    _apiContext.NhacAttach.Add(nhacAttach);
                    _apiContext.SaveChanges();
                    return nhacAttach.Id;
                }
            } 
            catch (Exception ex)
            {

            }
            return "";
        }

    }
}
