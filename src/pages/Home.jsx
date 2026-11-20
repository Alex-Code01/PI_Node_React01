import Mapa from "../components/Mapa";
import BarraPesquisa from "../components/BarraPesquisa";
import useLocalizacao from "../hooks/useLocalizacao";

// Tela inicial: mapa de fundo + painel de pesquisa por cima.
export default function Home() {
  const { posicao, erro } = useLocalizacao(); // pede permissão de GPS ao abrir
  return (
    <main className="tela">
      <Mapa posicao={posicao} />
      <section className="painel">
        <BarraPesquisa />
        {/* Se o usuário negar o GPS, explica o que fazer */}
        {erro && <p className="aviso">{erro}</p>}
      </section>
    </main>
  );
}
