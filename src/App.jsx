import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
// import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Ingresos from "./pages/Ingresos";
import Gastos from "./pages/Gastos";
import Categorias from "./pages/Categorias";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      {/* <Route path="/register" element={<Register />} />*/}
      <Route path="/dashboard" element={<Dashboard />} /> 
      <Route path="/ingresos" element={<Ingresos />} />
      <Route path="/gastos" element={<Gastos/>} />
      <Route path="/categorias" element={<Categorias />} />
    </Routes>
  );
}

export default App;