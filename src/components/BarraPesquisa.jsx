import { useState } from "react";
import { Link } from "react-router-dom";
import { pesquisar } from "../services/transporte";

export default function BarraPesquisa() {
  const [termo, setTermo] = useState(""); // texto digitado
  const resultados = pesquisar(termo); // recalculado a cada tecla (a lista é pequena)

  return (
    <div className="pesquisa">
      {/* Rótulo invisível, mas lido por leitores de tela */}
      <label htmlFor="busca" className="sr-only">Pesquisar linha ou ponto</label>
      <input
        id="busca"
        type="search"
        placeholder="Qual linha ou ponto você procura?"
        value={termo} // input controlado pelo estado
        onChange={(e) => setTermo(e.target.value)}
        autoComplete="off"
      />
      {/* Só mostra a lista se houver texto digitado */}
      {termo.trim() && (
        <ul className="resultados">
          {/* Estado vazio: explica o que fazer */}
          {resultados.length === 0 && <li className="vazio">Nada encontrado. Tente o número da linha ou o nome do ponto.</li>}
          {resultados.map((r) => (
            <li key={r.chave}>
              {/* Clicar leva à página da linha, sem recarregar o site */}
              <Link to={`/linha/${r.linhaId}`}>
                <b>{r.titulo}</b>
                <small>{r.tipo}{r.detalhe ? ` · ${r.detalhe}` : ""}</small>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
