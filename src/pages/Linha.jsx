import { Link, useParams } from "react-router-dom";
import Mapa from "../components/Mapa";
import IndicadorLotacao from "../components/IndicadorLotacao";
import Reportar from "../components/Reportar";
import useLocalizacao from "../hooks/useLocalizacao";
import useOnibusSimulado from "../hooks/useOnibusSimulado";
import useLocalStorage from "../hooks/useLocalStorage";
import { obterLinha } from "../services/transporte";

// Tela de resultado: traçado, ônibus, lotação, favorito e reporte.
export default function Linha() {
  const { id } = useParams(); // pega ":id" da URL /linha/:id
  const linha = obterLinha(id);
  const { posicao } = useLocalizacao();
  const onibus = useOnibusSimulado(linha);
  // Hooks sempre antes de qualquer "return" condicional (regra do React)
  const [favoritos, setFavoritos] = useLocalStorage("emptybus_favoritos", []);

  // Linha inexistente: mensagem com saída clara
  if (!linha) {
    return (
      <main className="centro">
        <p>Linha não encontrada.</p>
        <Link to="/">Voltar à pesquisa</Link>
      </main>
    );
  }

  const favorita = favoritos.includes(linha.id);
  // Se já é favorita, remove; senão, adiciona
  const alternarFavorito = () =>
    setFavoritos(favorita ? favoritos.filter((f) => f !== linha.id) : [...favoritos, linha.id]);

  return (
    <main className="tela">
      <Mapa posicao={posicao} linha={linha} onibus={onibus} />
      <section className="painel">
        <Link to="/" className="voltar">‹ Pesquisar outra linha</Link>
        <h1><span className="selo" style={{ background: linha.cor }}>{linha.numero}</span> {linha.nome}</h1>
        {/* aria-pressed informa a leitores de tela se o botão está ativo */}
        <button className="fav" onClick={alternarFavorito} aria-pressed={favorita}>
          {favorita ? "★ Remover dos favoritos" : "☆ Adicionar aos favoritos"}
        </button>
        {onibus && (
          <>
            <h2>Lotação agora</h2>
            <IndicadorLotacao percentual={onibus.lotacao} />
            <p className="nota">Ônibus simulado, sentido de {onibus.sentido}. Dados fictícios do MVP.</p>
          </>
        )}
        <h2>Pontos da linha</h2>
        <ol className="pontos">
          {linha.pontos.map((p) => <li key={p.nome}>{p.nome}</li>)}
        </ol>
        <h2>Algo errado?</h2>
        <Reportar linhaId={linha.id} />
      </section>
    </main>
  );
}
