import { Link } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import { obterLinha } from "../services/transporte";

// Lista as linhas favoritadas (HU10).
export default function Favoritos() {
  const [favoritos] = useLocalStorage("emptybus_favoritos", []);
  // Converte ids em linhas e descarta ids que não existem mais
  const linhas = favoritos.map(obterLinha).filter(Boolean);

  return (
    <main className="centro">
      <div className="cartao">
        <h1>Linhas favoritas</h1>
        {/* Estado vazio: diz como adicionar */}
        {linhas.length === 0 && <p>Você ainda não tem favoritas. Abra uma linha e toque em "Adicionar aos favoritos".</p>}
        <ul className="resultados">
          {linhas.map((l) => (
            <li key={l.id}><Link to={`/linha/${l.id}`}><b>{l.numero} · {l.nome}</b></Link></li>
          ))}
        </ul>
      </div>
    </main>
  );
}
