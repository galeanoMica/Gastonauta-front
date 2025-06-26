import { apiRequest } from "../services/apiConnection";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
        await apiRequest("/auth/logout", "POST");
        localStorage.removeItem("usuario");
        navigate("/");
        } catch (err) {
        console.error("Error al cerrar sesión:", err.message);
        }
    };

  return (
    <aside className="w-44 bg-gradient-to-br from-[#8B75C9] to-[#ACD7EC] text-white p-5 flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-bold mb-10">Gastonauta 🚀</h2>
        <nav className="space-y-4">
          <a href="/dashboard" className="block text-[#d6edff] hover:text-white transition">Inicio</a>
          <a href="/ingresos" className="block text-[#d6edff] hover:text-white transition">Ingresos</a>
          <a href="/gastos" className="block text-[#d6edff] hover:text-white transition">Gastos</a>
          <a href="/categorias" className="block text-[#d6edff] hover:text-white transition">Categorías</a>
          <button onClick={handleLogout} className="text-sm text-[#d6edff] bg-gradient-to-br from-[#8B75C9] to-[#ACD7EC] hover:underline mt-6">
            Cerrar sesión
          </button>

        </nav>
      </div>
      <p className="text-sm text-white/80">© 2025</p>
    </aside>
  );
}