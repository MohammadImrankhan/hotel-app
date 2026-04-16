namespace RubaruAPI.Model
{
    public class Feedback
    {
        public int id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Message { get; set; }
        public int Rating { get; set; }
        public DateTime createdon { get; set; }
    }
}
