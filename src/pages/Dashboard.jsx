import { useEffect, useState } from "react";
import { apiRequest } from "../services/apiConnection";
import DashboardLayout from "../components/DashboardLayout";
import ResumenCard from "../components/ResumenCard";

export default function Dashboard() {
  const [ingresos, setIngresos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [resumen, setResumen] = useState([]);
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const formatearFecha = (fecha) => {
    const opciones = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    };
    return new Date(fecha).toLocaleDateString("es-AR", opciones);
  };

 useEffect(() => {
  const fetchResumen = async () => {
    const anio = 2025;
    const mes = 6;

    try {
      const data = await apiRequest(`/resumen?anio=${anio}&mes=${mes}`, "GET", null);
      console.log("traer resumen exitoso:", data);
      setResumen(data);
    } catch (err) {
      console.error("Error al obtener resumen:", err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchResumen();
}, []);


  return (
    <DashboardLayout>
        <div className="flex items-center gap-4 mb-6">
          <img src="/gastonauta.png" alt="Logo gastonauta" className="w-24 h-auto" />
          <h1 className="text-3xl font-bold text-[#478978]">Dashboard</h1>
        </div>

        <h2>Buenos días, {usuario.nombre} </h2>
        <p>Hoy es {formatearFecha(new Date())}. Estas son tus finanzas:</p>

        <div className="flex flex-wrap gap-6 mb-8">
            <ResumenCard titulo="Ingresos" monto={resumen.totalIngresos} bgColor="#E0F7EC" textColor="#4CAF50" />
            <ResumenCard titulo="Gastos" monto={resumen.totalGastos} bgColor="#FCEBEA" textColor="#F44336" />
            <ResumenCard titulo="Balance" monto={resumen.saldo} bgColor="#E8F0FE" textColor="#2196F3" />
        </div>
    </DashboardLayout>

  );
}