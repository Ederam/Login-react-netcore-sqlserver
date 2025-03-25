using ApiLogin.Models;
using Microsoft.EntityFrameworkCore;

namespace ApiLogin.Context
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
            
        }

        public DbSet<Usuarios> usuarios { get; set; }
    }
}
