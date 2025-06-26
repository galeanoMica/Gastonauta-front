import { useState, useEffect } from "react";
import { apiRequest } from "../services/apiConnection";
import DashboardLayout from "../components/DashboardLayout";
import CategoriaForm from "../components/CategoriaForm";

export default function Categorias() {
  const [categorias, setCategorias] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const fetchCategorias = async () => {
    try {
      const data = await apiRequest("/categorias", "GET");
      setCategorias(data);
    } catch (err) {
      console.error("Error al obtener categorías:", err);
    }
  };

  useEffect(() => {
    fetchCategorias();
  }, []);

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#478978]">Categorías 🗃️</h1>
        <button
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
          className="bg-[#84DCC6] hover:bg-[#478978] text-white font-semibold px-4 py-2 rounded transition"
        >
          {mostrarFormulario ? "Cancelar" : "+ Nueva categoría"}
        </button>
      </div>

      {mostrarFormulario && (
        <CategoriaForm
          onClose={() => setMostrarFormulario(false)}
          onRefresh={fetchCategorias}
        />
      )}

      <ul className="mt-4 space-y-2">
        {categorias.map((cat) => (
          <li key={cat.id} className="bg-white p-3 shadow rounded">
            <span className="font-semibold">{cat.nombre}</span>{" "}
            <span className="text-sm text-gray-500">({cat.tipo})</span>
          </li>
        ))}
      </ul>
    </DashboardLayout>
  );
}