import { useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const TIPOS = ["Ônibus não passou", "Lotação diferente do informado", "Informação incorreta", "Outro"];

// Formulário de reporte (HU07). Por enquanto salva no navegador; depois enviará à API.
export default function Reportar({ linhaId }) {
  const [reportes, setReportes] = useLocalStorage("emptybus_reportes", []); // lista salva
  const [tipo, setTipo] = useState(TIPOS[0]); // tipo escolhido
  const [texto, setTexto] = useState(""); // detalhes opcionais
  const [enviado, setEnviado] = useState(false); // controla a confirmação

  function enviar(e) {
    e.preventDefault(); // evita recarregar a página
    // Acrescenta o novo reporte ao fim da lista existente
    setReportes([...reportes, { linhaId, tipo, texto, data: new Date().toISOString() }]);
    setTexto(""); // limpa o campo
    setEnviado(true); // mostra confirmação
  }

  // Após enviar, troca o formulário por uma confirmação (com opção de enviar outro)
  if (enviado) {
    return (
      <p role="status">
        Reporte enviado. <button className="link escuro" onClick={() => setEnviado(false)}>Enviar outro</button>
      </p>
    );
  }

  return (
    <form onSubmit={enviar} className="reporte">
      <label>Tipo de problema
        <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
          {TIPOS.map((t) => <option key={t}>{t}</option>)}
        </select>
      </label>
      <label>Detalhes (opcional)
        <textarea rows="2" value={texto} onChange={(e) => setTexto(e.target.value)} />
      </label>
      <button type="submit">Enviar reporte</button>
    </form>
  );
}
