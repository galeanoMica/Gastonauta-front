import { useState, useEffect } from "react";
import { apiRequest } from "../services/apiConnection";

export default function IngresoForm({ modoEdicion = false,
  ingresoEditado = null,
  onClose,
  onRefresh
 }) {
  const [form, setForm] = useState({
  monto: ingresoEditado?.monto || "",
  descripcion: ingresoEditado?.descripcion || "",
  fecha: ingresoEditado?.fecha || "",
  categoriaId: ingresoEditado?.categoria?.id?.toString() || ""
});

  const [categorias, setCategorias] = useState([]);
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  console.log('---usuario',usuario);
  
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const data = await apiRequest("/categorias?tipo=INGRESO");
        setCategorias(data);
      } catch (error) {
        console.error("Error al cargar categorías:", error.message);
      }
    };

    fetchCategorias();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dto = {
        monto: parseFloat(form.monto),
        descripcion: form.descripcion,
        fecha: form.fecha,
        categoriaId: parseInt(form.categoriaId),
        usuarioId: usuario.id
    };
      try{
        console.log("DTO que se envía: fuera ", dto);
        if (modoEdicion) {
          console.log("DTO que se envía: modo edicion ", dto);
          await apiRequest(`/ingresos/${ingresoEditado.idIngreso}`, "PATCH", dto);
        } else {
          console.log("DTO que se envía: modo post ", dto);
          await apiRequest("/ingresos", "POST", dto);
        }

    // try {
    //   await apiRequest("/ingresos", "POST", {
    //     ...form,
    //     monto: parseFloat(form.monto),
    //     categoriaId: parseInt(form.categoriaId),
    //     usuarioId: usuario.id
    //   });
      onRefresh(); 
      onClose();  
     } catch (error) {
  console.error("Error al guardar ingreso:", error); 
}
  };
    

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded shadow mb-6 space-y-4 max-w-xl"
    >
      <div className="flex flex-col md:flex-row md:gap-4">
        <input
          type="number"
          name="monto"
          placeholder="Monto"
          value={form.monto}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="text"
          name="descripcion"
          placeholder="Descripción"
          value={form.descripcion}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />
      </div>
      <div className="flex flex-col md:flex-row md:gap-4">
        <input
          type="date"
          name="fecha"
          value={form.fecha}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />
        <select
          name="categoriaId"
          value={form.categoriaId}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        >
          <option value="">Seleccioná una categoría</option>
          {categorias.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.nombre}
            </option>
          ))}
        </select>
      </div>

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
          className="bg-[#478978] hover:bg-[#85D8C6] text-white font-semibold px-4 py-2 rounded transition"
        >
          Guardar ingreso
        </button>
      </div>
    </form>
  );
}