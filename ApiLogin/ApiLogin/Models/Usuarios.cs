using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ApiLogin.Models
{
    [Table("UsuariosReact")]
    public class Usuarios
    {
        [Key]
        public int id { get; set; }
        public string  apellido_paterno { get; set; }
        public string  apellido_materno { get; set; }
        public string  nombre { get; set; }
        public string  correo { get; set; }
        public string  username { get; set; }
        public string  password { get; set; }
        
    }
}
