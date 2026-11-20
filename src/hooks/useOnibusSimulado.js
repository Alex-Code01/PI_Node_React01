import { useState, useEffect } from "react";

// Simula um ônibus indo e voltando pela linha. Quando houver dados reais,
// este hook será trocado por uma chamada à API de posição dos veículos.
export default function useOnibusSimulado(linha) {
  // t = progresso na ida/volta (0 até o último ponto); volta = sentido atual
  const [estado, setEstado] = useState({ t: 0, volta: false });

  useEffect(() => {
    setEstado({ t: 0, volta: false }); // recomeça ao trocar de linha
    if (!linha) return;
    const max = linha.pontos.length - 1; // índice do último ponto
    // A cada 100 ms avança um pouco
    const id = setInterval(() => {
      setEstado(({ t, volta }) => {
        const prox = t + 0.03; // velocidade da simulação
        // Chegou ao fim: zera e inverte o sentido; senão continua
        return prox >= max ? { t: 0, volta: !volta } : { t: prox, volta };
      });
    }, 100);
    return () => clearInterval(id); // limpa o relógio ao sair/trocar de linha
  }, [linha]);

  if (!linha) return null;
  const max = linha.pontos.length - 1;
  const u = estado.volta ? max - estado.t : estado.t; // posição na linha (ida: 0→max; volta: max→0)
  const trecho = Math.min(Math.floor(u), max - 1); // trecho atual (entre ponto trecho e trecho+1)
  const f = u - trecho; // fração (0 a 1) já percorrida no trecho
  const a = linha.pontos[trecho].pos; // início do trecho
  const b = linha.pontos[trecho + 1].pos; // fim do trecho
  return {
    // Interpolação linear: ponto entre a e b conforme a fração f
    pos: [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f],
    lotacao: linha.lotacao[trecho], // lotação do trecho onde o ônibus está
    sentido: estado.volta ? "volta" : "ida",
  };
}
