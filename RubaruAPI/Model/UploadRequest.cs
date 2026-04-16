namespace RubaruAPI.Model
{
    public class UploadRequest
    {
        //public IFormFile File { get; set; }
        public List<IFormFile> Files { get; set; }
        public int RoomId { get; set; }
    }
}
