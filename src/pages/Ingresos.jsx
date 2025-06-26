import { useEffect, useState } from "react";
import { apiRequest } from "../services/apiConnection";
import DashboardLayout from "../components/DashboardLayout";
import IngresoForm from "../components/IngresoForm";

export default function Ingresos() {
  const [ingresos, setIngresos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [ingresoSeleccionado, setIngresoSeleccionado] = useState(null);

  const fetchIngresos = async () => {
  try {
    const data = await apiRequest("/ingresos", "GET");
    setIngresos(data);
    
  } catch (err) {
    console.error("Error al obtener ingresos:", err.message);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchIngresos();
}, []);
const handleEliminarIngreso = async (id) => {
      const confirmacion = window.confirm("¿Estás seguro de que querés eliminar este ingreso?");
      if (!confirmacion) return;

      try {
        await apiRequest(`/ingresos/${id}`, "DELETE");
        fetchIngresos();
      } catch (error) {
        console.error("Error al eliminar ingreso:", error);
      }
  };

  return (
   <DashboardLayout>
  <div className="flex justify-between items-center mb-6">
    <h1 className="text-3xl font-bold text-[#478978]">Ingresos 💰</h1>
    <button
      onClick={() => setMostrarFormulario(!mostrarFormulario)}
      className="bg-[#84DCC6] hover:bg-[#478978] text-white font-semibold px-4 py-2 rounded transition"
    >
      {mostrarFormulario ? "Cancelar" : "+ Agregar ingreso"}
    </button>

  </div>
  {mostrarFormulario && (
  <IngresoForm
    modoEdicion={modoEdicion}
    ingresoEditado={ingresoSeleccionado}
    onClose={() => {
      setMostrarFormulario(false);
      setIngresoSeleccionado(null);
      setModoEdicion(false);
    }}
    onRefresh={fetchIngresos}
  />
)}

  {loading ? (
    <p className="text-gray-500">Cargando ingresos...</p>
  ) : ingresos.length === 0 ? (
    <p className="text-gray-500">Aún no registraste ningún ingreso.</p>
  ) : (
    <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 items-start">
      {ingresos.map((ingreso) => (
        <li key={ingreso.idIngreso} className="p-4 bg-white shadow rounded-lg max-w-md w-full">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-gray-600">{ingreso.fecha}</span>
            <span className="font-bold text-green-600">${ingreso.monto}</span>
          </div>
          <p className="text-gray-800 font-medium">{ingreso.descripcion}</p>
          <button
              onClick={() => {
                setIngresoSeleccionado(ingreso);
                setModoEdicion(true);
                setMostrarFormulario(true);
              }}
              className="text-sm text-blue-600 hover:underline"
            >
              Editar
          </button>
          <button
              onClick={() => handleEliminarIngreso(ingreso.idIngreso)}
              className="text-sm text-red-600 hover:underline ml-4"
            >
              Eliminar
          </button>

        </li>
      ))}
    </ul>
  )}
</DashboardLayout>
  );
}