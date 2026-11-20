import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Login simulado (HU02). Trocar por API quando houver back-end.
// "onEntrar" vem do App e guarda o usuário.
export default function Login({ onEntrar }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate(); // permite mudar de página por código

  function enviar(e) {
    e.preventDefault();
    // Valida formato do e-mail e tamanho mínimo da senha
    if (!/^\S+@\S+\.\S+$/.test(email) || senha.length < 6) {
      setErro("Informe um e-mail válido e uma senha com pelo menos 6 caracteres.");
      return;
    }
    onEntrar({ nome: email.split("@")[0] }); // nome = parte antes do @
    navigate("/");
  }

  return (
    <main className="centro">
      {/* noValidate: usamos nossa validação e mensagem em vez da do navegador */}
      <form className="cartao" onSubmit={enviar} noValidate>
        <h1>Entrar no Empty-Bus</h1>
        <label>E-mail<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></label>
        <label>Senha<input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} /></label>
        {/* role="alert": leitor de tela anuncia o erro na hora */}
        {erro && <p className="aviso" role="alert">{erro}</p>}
        <button type="submit">Entrar</button>
        <button type="button" className="secundario" onClick={() => { onEntrar({ nome: "visitante" }); navigate("/"); }}>
          Continuar como visitante
        </button>
      </form>
    </main>
  );
}
