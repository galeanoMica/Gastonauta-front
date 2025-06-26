import { useState } from "react";
import { apiRequest } from "../services/apiConnection";

export default function CategoriaForm({ onClose, onRefresh }) {
  const [form, setForm] = useState({
    nombre: "",
    tipo: "GASTO", 
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiRequest("/categorias", "POST", form);
      onRefresh?.();
      onClose?.();
    } catch (error) {
      console.error("Error al crear categoría:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded shadow space-y-4 max-w-md"
    >
      <h2 className="text-lg font-semibold text-[#478978]">Nueva Categoría</h2>

      <input
        type="text"
        name="nombre"
        placeholder="Nombre de categoría"
        value={form.nombre}
        onChange={handleChange}
        className="border p-2 rounded w-full"
        required
      />

      <select
        name="tipo"
        value={form.tipo}
        onChange={handleChange}
        className="border p-2 rounded w-full"
      >
        <option value="GASTO">Gasto</option>
        <option value="INGRESO">Ingreso</option>
      </select>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 border border-gray-400 rounded hover:bg-gray-100"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="bg-[#478978] hover:bg-[#85D8C6] text-white font-semibold px-4 py-2 rounded"
        >
          Crear
        </button>
      </div>
    </form>
  );
}