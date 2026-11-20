import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Linha from "./pages/Linha";
import Login from "./pages/Login";
import Favoritos from "./pages/Favoritos";
import useLocalStorage from "./hooks/useLocalStorage";
import "./styles.css";

export default function App() {
  // Usuário logado, persistido no navegador (null = ninguém logado)
  const [usuario, setUsuario] = useLocalStorage("emptybus_usuario", null);

  return (
    // BrowserRouter habilita a navegação por URL sem recarregar a página
    <BrowserRouter>
      {/* Cabeçalho fixo em todas as telas */}
      <header className="topo">
        <Link to="/" className="marca">Empty-Bus</Link>
        <nav className="menu">
          <Link to="/favoritos">Favoritos</Link>
          {usuario ? (
            <span>Olá, {usuario.nome} <button className="link" onClick={() => setUsuario(null)}>Sair</button></span>
          ) : (
            <Link to="/login">Entrar</Link>
          )}
        </nav>
      </header>
      {/* Cada rota mostra uma página */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/linha/:id" element={<Linha />} />
        <Route path="/favoritos" element={<Favoritos />} />
        <Route path="/login" element={<Login onEntrar={setUsuario} />} />
        {/* Qualquer endereço desconhecido volta para a Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
