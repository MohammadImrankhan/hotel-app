using Microsoft.AspNetCore.Mvc;
using Npgsql;
using RubaruAPI.Model;
namespace RubaruResport.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UploadController : ControllerBase
    {
        private readonly IWebHostEnvironment _env;
        private readonly IConfiguration _config;

        public UploadController(IWebHostEnvironment env, IConfiguration config)
        {
            _env = env;
            _config = config;
        }
        [HttpGet("images")]
        public async Task<IActionResult> GetImagesWithDetails()
        {
            try
            {
                var list = new List<Images>();
                Images obj = null;
                using var conn = new NpgsqlConnection(_config.GetConnectionString("DefaultConnection"));
                await conn.OpenAsync();

                var cmd = new NpgsqlCommand("SELECT * FROM get_images_with_room_details()", conn);
                var reader = await cmd.ExecuteReaderAsync();

                while (await reader.ReadAsync())
                {
                    obj = new Images();
                    obj.ImageId = Convert.ToInt32(reader["image_id"]);
                    obj.ImageUrl = reader["image_url"].ToString();
                    obj.RoomName = reader["room_name"].ToString();
                    obj.RoomType = reader["room_type"].ToString();
                    obj.CreatedOn =Convert.ToDateTime(reader["created_at"]);
                    list.Add(obj);
                }

                return Ok(list);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    message = "Error",
                    error = ex.Message
                });
            }
        }
        [HttpDelete("delete-image")]
        public async Task<IActionResult> DeleteImage(int id)
        {
            try
            {
                using var conn = new NpgsqlConnection(_config.GetConnectionString("DefaultConnection"));
                await conn.OpenAsync();

                // Get path
                var cmdGet = new NpgsqlCommand("SELECT url FROM images WHERE id=@id", conn);
                cmdGet.Parameters.AddWithValue("@id", id);

                var url = (string)await cmdGet.ExecuteScalarAsync();

                if (url != null)
                {
                    var filePath = Path.Combine(_env.WebRootPath, url.TrimStart('/'));

                    if (System.IO.File.Exists(filePath))
                        System.IO.File.Delete(filePath);
                }

                // Delete DB record
                var cmdDel = new NpgsqlCommand("DELETE FROM images WHERE id=@id", conn);
                cmdDel.Parameters.AddWithValue("@id", id);

                await cmdDel.ExecuteNonQueryAsync();

                return Ok("Deleted");
            }
            catch (NpgsqlException ex)
            {
                // Database-related errors
                return StatusCode(500, new
                {
                    message = "Database error",
                    error = ex.Message
                });
            }
            catch (Exception ex)
            {
                // General errors
                return StatusCode(500, new
                {
                    message = "Server error",
                    error = ex.Message
                });
            }
        }

        //[HttpPost("Upload")]
        //public async Task<IActionResult> Upload([FromForm] UploadRequest obj_uploadReq)
        //{
        //    try
        //    {
        //        if (obj_uploadReq.File == null || obj_uploadReq.File.Length == 0)
        //            return BadRequest("No file");
        //        var connStr = _config.GetConnectionString("DefaultConnection");
        //        using var conn = new NpgsqlConnection(connStr);
        //        await conn.OpenAsync();
        //        // ✅ FIX ROOT PATH
        //        var root = _env.WebRootPath ?? Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");

        //        var folder = Path.Combine(root, "uploads", $"room_{obj_uploadReq.RoomId}");

        //        if (!Directory.Exists(folder))
        //            Directory.CreateDirectory(folder);

        //        // File save
        //        var fileName = Guid.NewGuid() + Path.GetExtension(obj_uploadReq.File.FileName);
        //        var filePath = Path.Combine(folder, fileName);

        //        using (var stream = new FileStream(filePath, FileMode.Create))
        //        {
        //            await obj_uploadReq.File.CopyToAsync(stream);
        //        }

        //        // ✅ CORRECT PATH
        //        var dbPath = $"/uploads/room_{obj_uploadReq.RoomId}/{fileName}";

        //        // Insert
        //        var cmd = new NpgsqlCommand(
        //            "INSERT INTO images(roomid, url) VALUES(@roomid, @url)",
        //            conn
        //        );

        //        cmd.Parameters.AddWithValue("@roomid", obj_uploadReq.RoomId);
        //        cmd.Parameters.AddWithValue("@url", dbPath);

        //        await cmd.ExecuteNonQueryAsync();

        //        return Ok(new { message = "Uploaded", path = dbPath });
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(500, new
        //        {
        //            message = "Error",
        //            error = ex.Message
        //        });
        //    }
        //}



        [HttpPost("UploadMultiple")]
        public async Task<IActionResult> UploadMultiple([FromForm] UploadRequest request)
        {
            try
            {
                if (request.Files == null || request.Files.Count == 0)
                    return BadRequest("No files");

                using var conn = new NpgsqlConnection(_config.GetConnectionString("DefaultConnection"));
                await conn.OpenAsync();                

                var root = _env.WebRootPath ?? Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
                var folder = Path.Combine(root, "uploads", $"room_{request.RoomId}");

                if (!Directory.Exists(folder))
                    Directory.CreateDirectory(folder);

                var paths = new List<string>();

                foreach (var file in request.Files)
                {
                    var fileName = Guid.NewGuid() + Path.GetExtension(file.FileName);
                    var filePath = Path.Combine(folder, fileName);

                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await file.CopyToAsync(stream);
                    }

                    var dbPath = $"/uploads/room_{request.RoomId}/{fileName}";
                    paths.Add(dbPath);

                    var cmd = new NpgsqlCommand(
                        "INSERT INTO images(roomid, url) VALUES(@roomid, @url)", conn
                    );

                    cmd.Parameters.AddWithValue("@roomid", request.RoomId);
                    cmd.Parameters.AddWithValue("@url", dbPath);

                    await cmd.ExecuteNonQueryAsync();
                }

                return Ok(new { message = "Uploaded", paths });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error", error = ex.Message });
            }
        }

    }
}
