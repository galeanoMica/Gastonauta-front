import { useState } from "react";
import { apiRequest } from "../services/apiConnection";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const data = await apiRequest("/auth/login", "POST", form);
      console.log("Login exitoso:", data);
      localStorage.setItem("usuario", JSON.stringify({
            id: data.idUser,
            nombre: data.nombre,
            email: data.email,
        }));
        console.log('--', JSON.parse(localStorage.getItem("usuario")));
        
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Error al iniciar sesión");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-tr from-[#84DCC6] to-[#8B95C9]">
      <div className="bg-white/40 shadow-xl backdrop-blur rounded-2xl p-12 w-full max-w-xl">
        <h2 className="text-2xl font-bold text-center mb-6 text-[#478978]">
          Gastonauta 🚀
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm mb-1 font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#84DCC6]"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1 font-medium text-gray-700">Contraseña</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#84DCC6]"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full py-2 bg-[#85D8C6] text-[#478978] font-semibold rounded-lg hover:bg-[#478978] hover:text-white transition duration-200"
          >
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
}