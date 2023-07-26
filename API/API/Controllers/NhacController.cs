using Microsoft.AspNetCore.Mvc;
using Model.Entities;
using Model.Models;
using Service;

namespace API.Controllers
{
    [ApiController]
    [Route("api/nhac")]
    public class NhacController : ControllerBase
    {
        private readonly INhacService _nhacService;
        public NhacController(INhacService nhacService)
        {
            _nhacService = nhacService;
        }

        [HttpGet]
        [Route("get-Nhac")]
        public ActionResult<List<NhacInfor>> GetNhac()
        {
            var data = _nhacService.getNhac();
            return Ok(data);
        }

        [HttpPost]
        [Route("add-Nhac")]
        public IActionResult AddNhac([FromBody] NhacInfor nhacInfor)
        {
            string result = _nhacService.addNhac(nhacInfor);
            if (!string.IsNullOrEmpty(result))
            {
                return Ok(nhacInfor);
            }
            else
            {
                return BadRequest("Thêm nhạc không thành công!");
            }
        }

        [HttpPost]
        [Route("update-Nhac")]
        public IActionResult UpdateNhac([FromBody] NhacInfor nhacInfor)
        {
            string result = _nhacService.updateNhac(nhacInfor);

            return Ok(result);
        }

        [HttpGet]
        [Route("get-NhacBy/{id}")]
        public ActionResult<NhacInfor> GetNhacById([FromRoute] string id)
        {
            var data = _nhacService.getNhacById(id);
            return Ok(data);
        }

        [HttpDelete]
        [Route("delete-Nhac/{id}")]
        public bool DeleteNhac([FromRoute] string id)
        {
            bool result = _nhacService.deleteNhac(id);
            return result;
        }

        [HttpPost]
        [Route("pagination-Nhac")]
        public IActionResult PaginationNhac(PaginationInfor paginationInfor)
        {
            var paginatedNhacs = _nhacService.paginationNhac(paginationInfor);
            return Ok(paginatedNhacs);
        }

        [HttpPost]
        [Route("upload-Nhac")]
        public async Task<IActionResult> UploadNhac(IFormFile files)
        {
            var upload = await _nhacService.uploadNhac(files);
            return Ok(upload);
        }


    }
}
