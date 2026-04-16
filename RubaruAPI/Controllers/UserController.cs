using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Npgsql;
using RubaruAPI.Model;
using System.Reflection;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Dapper;
using static Npgsql.Replication.PgOutput.Messages.RelationMessage;

namespace RubaruAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IConfiguration _config;

        public UserController(IConfiguration config)
        {

            _config = config;
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] User login)
        {
            try
            {
                if (login == null || string.IsNullOrEmpty(login.Username) || string.IsNullOrEmpty(login.Password))
                {
                    return BadRequest(new { message = "Username and Password required" });
                }

                var connStr = _config.GetConnectionString("DefaultConnection");

                using var conn = new NpgsqlConnection(connStr);
                await conn.OpenAsync();

                var cmd = new NpgsqlCommand("SELECT fn_user_login(@username, @passwordhash)", conn);
                cmd.Parameters.AddWithValue("@username", login.Username);
                cmd.Parameters.AddWithValue("@passwordhash", PasswordEncode.Encoder(login.Password));

                var result = await cmd.ExecuteScalarAsync();

                if (result != null)
                {


                    var token = GenerateJwtToken(login.Username);
                    return Ok(new { token });
                }

                return Unauthorized();
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
        private string GenerateJwtToken(string username)
        {
            var claims = new[]
            {
        new Claim(ClaimTypes.Name, username)
    };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: "yourdomain.com",
                audience: "yourdomain.com",
                claims: claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
        [Authorize]
        [HttpGet("secure-data")]
        public IActionResult GetSecureData()
        {
            return Ok("This is protected data");
        }

        [HttpGet("RoomType")]
        public async Task<IActionResult> GetRoomType()
        {
            try
            {
                var list = new List<RoomType>();
                RoomType obj = null;

                using var conn = new NpgsqlConnection(_config.GetConnectionString("DefaultConnection"));
                await conn.OpenAsync();

                var cmd = new NpgsqlCommand("SELECT * FROM roomtype", conn);
                var reader = await cmd.ExecuteReaderAsync();

                while (await reader.ReadAsync())
                {
                    obj = new RoomType();
                    obj.RoomTypeID = Convert.ToInt32(reader["id"]);
                    obj.RoomTypeName = reader["name"].ToString();
                    obj.Description = reader["description"].ToString();

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
        [HttpGet("RoomsCards")]
        public async Task<IActionResult> GetRooms(long roomtypeid)
        {
            try
            {
                var list = new List<Room>();
                Room obj = null;

                using var conn = new NpgsqlConnection(_config.GetConnectionString("DefaultConnection"));
                await conn.OpenAsync();

                var cmd = new NpgsqlCommand("SELECT * FROM rooms WHERE roomtypeid = @roomtypeid", conn);
                cmd.Parameters.AddWithValue("@roomtypeid", roomtypeid);
                var reader = await cmd.ExecuteReaderAsync();

                while (await reader.ReadAsync())
                {
                    obj = new Room();
                    obj.RoomID = Convert.ToInt32(reader["id"]);
                    obj.RoomName = reader["name"].ToString();
                    obj.RoomDescription = reader["description"].ToString();
                    obj.RoomTypeID = Convert.ToInt32(reader["roomtypeid"]);
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
        #region Rooms

        #region Get
        [HttpGet("rooms")]
        public async Task<IActionResult> GetRooms(int? roomtypeid)
        {
            try
            {
                var list = new List<Room>();
                Room obj = null;
                using var conn = new NpgsqlConnection(_config.GetConnectionString("DefaultConnection"));
                await conn.OpenAsync();

                var cmd = new NpgsqlCommand(
                    "SELECT * FROM fn_room_crud('SELECT', NULL, NULL, NULL, @roomtypeid)", conn);
                cmd.Parameters.AddWithValue("@roomtypeid", (object?)roomtypeid ?? DBNull.Value);

                var reader = await cmd.ExecuteReaderAsync();

                while (await reader.ReadAsync())
                {
                    obj = new Room();
                    obj.RoomID = reader.GetInt32(reader.GetOrdinal("id"));
                    obj.RoomTypeID = Convert.ToInt32(reader["roomtypeid"]);
                    obj.RoomName = reader["room_name"].ToString();
                    obj.RoomDescription = reader["description"].ToString();
                    obj.RoomTypeDesc = reader["room_type"].ToString();
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
        #endregion

        #region Post
        [HttpPost("room")]
        public async Task<IActionResult> AddRoom([FromBody] Room model)
        {
            try
            {
                using var conn = new NpgsqlConnection(_config.GetConnectionString("DefaultConnection"));
                await conn.OpenAsync();

                var cmd = new NpgsqlCommand(
                    "SELECT * FROM fn_room_crud(@action, @id, @name, @description, @roomtypeid)", conn);

                cmd.Parameters.AddWithValue("@action", "INSERT");
                cmd.Parameters.AddWithValue("@id", DBNull.Value);
                cmd.Parameters.AddWithValue("@name", model.RoomName ?? (object)DBNull.Value);
                cmd.Parameters.AddWithValue("@description", model.RoomDescription ?? (object)DBNull.Value);
                cmd.Parameters.AddWithValue("@roomtypeid", model.RoomTypeID);

                var reader = await cmd.ExecuteReaderAsync();

                int newId = 0;

                if (await reader.ReadAsync())
                {
                    newId = Convert.ToInt32(reader["id"]);
                }

                return Ok(new { id = newId });
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
        #endregion

        #region Put
        [HttpPut("UpdateRoom")]
        public async Task<IActionResult> UpdateRoom([FromBody] Room model)
        {
            try
            {
                using var conn = new NpgsqlConnection(_config.GetConnectionString("DefaultConnection"));
                await conn.OpenAsync();

                var cmd = new NpgsqlCommand(
                    "SELECT * FROM fn_room_crud(@action, @id, @name, @description, @roomtypeid)", conn);

                cmd.Parameters.AddWithValue("@action", "UPDATE");
                cmd.Parameters.AddWithValue("@id", model.RoomID);
                cmd.Parameters.AddWithValue("@name", model.RoomName ?? (object)DBNull.Value);
                cmd.Parameters.AddWithValue("@description", model.RoomDescription ?? (object)DBNull.Value);
                cmd.Parameters.AddWithValue("@roomtypeid", model.RoomTypeID);

                var reader = await cmd.ExecuteReaderAsync();

                bool updated = await reader.ReadAsync();

                return Ok(updated);
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
        #endregion

        #region Delete
        [HttpDelete("room/{id}")]
        public async Task<IActionResult> DeleteRoom(int id)
        {
            try
            {
                using var conn = new NpgsqlConnection(_config.GetConnectionString("DefaultConnection"));
                await conn.OpenAsync();

                var cmd = new NpgsqlCommand(
                    "SELECT * FROM fn_room_crud(@action, @id, NULL, NULL, NULL)", conn);

                cmd.Parameters.AddWithValue("@action", "DELETE");
                cmd.Parameters.AddWithValue("@id", id);

                var reader = await cmd.ExecuteReaderAsync();

                bool deleted = await reader.ReadAsync();

                return Ok(deleted);
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
        #endregion
        #endregion

        #region Tariff
        [HttpDelete("tariff/{id}")]
        public async Task<IActionResult> Delete(int id)
        {

            using var conn = new NpgsqlConnection(_config.GetConnectionString("DefaultConnection"));
            await conn.OpenAsync();

            var cmd = new NpgsqlCommand(
                "SELECT * FROM fn_tariff_crud(@action, @id, NULL, NULL, NULL)", conn);

            cmd.Parameters.AddWithValue("@action", "DELETE");
            cmd.Parameters.AddWithValue("@id", id);

            var reader = await cmd.ExecuteReaderAsync();

            bool deleted = await reader.ReadAsync();

            return Ok(deleted);
        }
        [HttpGet("calculate-price")]
        public async Task<IActionResult> Calculate(int roomId, DateTime checkIn, DateTime checkOut)
        {
            try
            {
                // 🔹 Validation
                if (roomId <= 0)
                    return BadRequest("Invalid roomId");

                if (checkOut <= checkIn)
                    return BadRequest("Check-out must be after check-in");

                using var conn = new NpgsqlConnection(_config.GetConnectionString("DefaultConnection"));
                await conn.OpenAsync();

                var total = await conn.ExecuteScalarAsync<decimal?>(
                    "SELECT fn_calculate_booking_price(@roomId, @checkIn, @checkOut)",
                    new { roomId, checkIn, checkOut });

                return Ok(new
                {
                    roomId,
                    checkIn,
                    checkOut,
                    nights = (checkOut - checkIn).Days,
                    totalAmount = total ?? 0
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    message = "Error calculating price",
                    error = ex.Message
                });
            }
        }
        [HttpPost("save-tariff")]
        public async Task<IActionResult> SaveTariff([FromBody] Tariff model)
        {
            try
            {
                var action = model.ID == 0 ? "INSERT" : "UPDATE";
                using var conn = new NpgsqlConnection(_config.GetConnectionString("DefaultConnection"));
                await conn.OpenAsync();
                var cmd = new NpgsqlCommand(
                      "SELECT * FROM fn_tariff_crud(@action, @id, @roomid, @price, @season, @fromdate::date, @todate::date, @isactive)", conn);
                cmd.Parameters.AddWithValue("@action", action);
                cmd.Parameters.AddWithValue("@id", model.ID);
                cmd.Parameters.AddWithValue("@roomid", model.RoomId);
                cmd.Parameters.AddWithValue("@price", model.Price);
                cmd.Parameters.AddWithValue("@season", model.Season);
                cmd.Parameters.AddWithValue("@fromdate", model.FromDate);
                cmd.Parameters.AddWithValue("@todate", model.ToDate);
                cmd.Parameters.AddWithValue("@isactive", model.IsActive);
                await cmd.ExecuteNonQueryAsync();

                return Ok();
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

        [HttpGet("tariff")]
        public async Task<IActionResult> GetTariff()
        {
            try
            {
                var list = new List<Tariff>();
                Tariff obj = null;
                using var conn = new NpgsqlConnection(_config.GetConnectionString("DefaultConnection"));
                await conn.OpenAsync();

                var cmd = new NpgsqlCommand("SELECT * FROM fn_tariff_crud('SELECT')", conn);
                var reader = await cmd.ExecuteReaderAsync();

                while (await reader.ReadAsync())
                {
                    obj = new Tariff();
                    obj.ID = Convert.ToInt32(reader["id"]);
                    obj.RoomId = Convert.ToInt32(reader["roomid"]);
                    obj.imageurl = reader["imageurl"].ToString();                    
                    obj.Season = reader["season"].ToString();
                    obj.RoomName = reader["roomname"].ToString();
                    obj.Price = Convert.ToDecimal(reader["price"]);
                    if (reader["fromdate"] is DateOnly d1)
                        obj.FromDate = d1;
                    else
                        obj.FromDate = DateOnly.FromDateTime((DateTime)reader["fromdate"]);
                    if (reader["todate"] is DateOnly d2)
                        obj.ToDate = d2;
                    else
                        obj.ToDate = DateOnly.FromDateTime((DateTime)reader["todate"]);

                    obj.IsActive = Convert.ToBoolean(reader["isactive"]);
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
        [HttpPut("update-tariff")]
        public async Task<IActionResult> UpdateTariff(int id, decimal price)
        {
            using var conn = new NpgsqlConnection(_config.GetConnectionString("DefaultConnection"));
            await conn.OpenAsync();

            var cmd = new NpgsqlCommand(
                "UPDATE tariff SET price=@p WHERE id=@id",
                conn
            );

            cmd.Parameters.AddWithValue("@p", price);
            cmd.Parameters.AddWithValue("@id", id);

            await cmd.ExecuteNonQueryAsync();

            return Ok("Updated");
        }
        [HttpDelete("delete-tariff")]
        public async Task<IActionResult> DeleteTariff(int id)
        {
            using var conn = new NpgsqlConnection(_config.GetConnectionString("DefaultConnection"));
            await conn.OpenAsync();

            var cmd = new NpgsqlCommand(
                "DELETE FROM tariff WHERE id=@id",
                conn
            );

            cmd.Parameters.AddWithValue("@id", id);

            await cmd.ExecuteNonQueryAsync();

            return Ok("Deleted");
        }
        #endregion
    }
}
