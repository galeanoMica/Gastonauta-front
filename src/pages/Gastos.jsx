import { useEffect, useState } from "react";
import { apiRequest } from "../services/apiConnection";
import DashboardLayout from "../components/DashboardLayout";
import GastoForm from "../components/GastoForm";

export default function Gastos() {
  const [gastos, setGastos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [gastoSeleccionado, setGastoSeleccionado] = useState(null);

 const fetchGastos = async () => {
  try {
    const data = await apiRequest("/gastos", "GET");
    setGastos(data);
    
  } catch (err) {
    console.error("Error al obtener gastos:", err.message);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchGastos();
}, []);
const handleEliminarGasto = async (id) => {
      const confirmacion = window.confirm("¿Estás seguro de que querés eliminar este gasto?");
      if (!confirmacion) return;

      try {
        await apiRequest(`/gastos/${id}`, "DELETE");
        fetchGastos();
      } catch (error) {
        console.error("Error al eliminar gasto:", error);
      }
  };
  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold text-[#478978] mb-6">Gastos 💰</h1>
      <button
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
          className="bg-[#84DCC6] hover:bg-[#478978] text-white font-semibold px-4 py-2 rounded transition"
        >
          {mostrarFormulario ? "Cancelar" : "+ Agregar gasto"}
        </button>
      </div>
      {mostrarFormulario && (
        <GastoForm
          modoEdicion={modoEdicion}
          gastoEditado={gastoSeleccionado}
          onClose={() => {
            setMostrarFormulario(false);
            setGastoSeleccionado(null);
            setModoEdicion(false);
          }}
          onRefresh={fetchGastos}
        />
      )}
     {loading ? (
      <p className="text-gray-500">Cargando gastos...</p>
    ) : gastos.length === 0 ? (
      <p className="text-gray-500">Aún no registraste ningún gasto.</p>
    ) : (
      <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 items-start">
        {gastos.map((gasto) => (
          <li key={gasto.idGastos} className="p-4 bg-white shadow rounded-lg max-w-md w-full">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-gray-600">{gasto.fecha}</span>
              <span className="font-bold text-green-600">${gasto.monto}</span>
            </div>
            <p className="text-gray-800 font-medium">{gasto.descripcion}</p>
            <button
                onClick={() => {
                  setGastoSeleccionado(gasto);
                  setModoEdicion(true);
                  setMostrarFormulario(true);
                }}
                className="text-sm text-blue-600 hover:underline"
              >
                Editar
            </button>
            <button
              onClick={() => handleEliminarGasto(gasto.idGasto)}
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