using Microsoft.EntityFrameworkCore;

namespace TiendaKeytlin.Server.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        // Aquí define las entidades, por ejemplo:
        // public DbSet<Producto> Productos { get; set; }
    }
}
