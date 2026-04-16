using System.Text;
using System.Security.Cryptography;
namespace RubaruAPI.Model
{
    public class PasswordEncode
    {
        public static string Encoder(string pass)
        {
            string toHash = ":OSK:" + pass + ":OSK:";
            StringBuilder sb = new StringBuilder();
            using (SHA512 hash = SHA512.Create())
            {
                Encoding enc = Encoding.UTF8;
                Byte[] result = hash.ComputeHash(enc.GetBytes(toHash));
                foreach (Byte b in result)
                    sb.Append(b.ToString("x2"));
            }

            return sb.ToString();
        }
    }
}
