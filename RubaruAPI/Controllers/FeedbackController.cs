using Microsoft.AspNetCore.Mvc;
using Npgsql;
using RubaruAPI.Model;

namespace RubaruAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FeedbackController : ControllerBase
    {
        private readonly IConfiguration _config;

        public FeedbackController(IConfiguration config)
        {

            _config = config;
        }
        [HttpPost("save-feedback")]
        public async Task<IActionResult> SaveFeedback([FromBody] Feedback fb)
        {
            try
            {
                var connStr = _config.GetConnectionString("DefaultConnection");

                using var conn = new NpgsqlConnection(connStr);
                await conn.OpenAsync();

                var cmd = new NpgsqlCommand(
                    "SELECT fn_save_feedback(@name,@email,@message,@rating)",
                    conn
                );

                cmd.Parameters.AddWithValue("@name", fb.Name);
                cmd.Parameters.AddWithValue("@email", fb.Email);
                cmd.Parameters.AddWithValue("@message", fb.Message);
                cmd.Parameters.AddWithValue("@rating", fb.Rating);

                await cmd.ExecuteScalarAsync();

                return Ok(new { message = "Feedback submitted successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error", error = ex.Message });
            }
        }
        [HttpGet("get-feedback")]
        public async Task<IActionResult> GetFeedback()
        {
            try
            {
                var list = new List<Feedback>();
                Feedback obj = null;

                using var conn = new NpgsqlConnection(_config.GetConnectionString("DefaultConnection"));
                await conn.OpenAsync();

                var cmd = new NpgsqlCommand("SELECT * FROM feedback", conn);
                var reader = await cmd.ExecuteReaderAsync();

                while (await reader.ReadAsync())
                {
                    obj = new Feedback();
                    obj.id =Convert.ToInt32(reader["id"]);
                    obj.Name = reader["name"].ToString();
                    obj.Email = reader["email"].ToString();
                    obj.Message = reader["message"].ToString();
                    obj.Rating =Convert.ToInt32(reader["rating"]);
                    obj.createdon = Convert.ToDateTime(reader["createdon"]);
                    list.Add(obj);
                }

                return Ok(list);
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
    }
}
