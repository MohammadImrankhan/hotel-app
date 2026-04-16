namespace RubaruAPI.Model
{
    public class Tariff
    {
        public  int ID { get; set; }
        public int RoomId { get; set; }
        public string RoomName { get; set; }
        public string Season { get; set; }
        public string imageurl { get; set; }
        public decimal Price { get; set; }
        public DateOnly FromDate { get; set; }
        public DateOnly ToDate { get; set; }
        public Boolean IsActive { get; set; }
    }
}
