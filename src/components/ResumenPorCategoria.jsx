import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
Chart.register(ArcElement, Tooltip, Legend);

export default function ResumenPorCategoria({ datos, tipo }) {
  const categorias = datos.map((c) => c.categoria.nombre);
  const montos = datos.map((c) => c.monto);
  const colores = ["#84DCC6", "#ACD7EC", "#8B75C9", "#FFD166", "#EF476F", "#06D6A0"];

  const data = {
    labels: categorias,
    datasets: [
      {
        data: montos,
        backgroundColor: colores,
        borderWidth: 1
      }
    ]
  };

  return (
    <div className="max-w-sm bg-white p-4 rounded shadow">
      <h3 className="text-lg font-semibold text-[#478978] mb-2">
        {tipo === "INGRESO" ? "Ingresos por Categoría" : "Gastos por Categoría"}
      </h3>
      <Pie data={data} />
    </div>
  );
}