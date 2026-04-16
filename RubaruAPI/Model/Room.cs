namespace RubaruAPI.Model
{
    public class Room
    {
        public int RoomID { get; set; }
        public string RoomName { get; set; } = string.Empty;
        public string RoomDescription { get; set; } = string.Empty;
        public int RoomTypeID { get; set; }
        public string RoomTypeDesc { get; set; } = string.Empty;
        public decimal Price { get; set; }
    }
}
