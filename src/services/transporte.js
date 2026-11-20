import { linhas, buscarLinha } from "../data/linhas";

// Camada de acesso a dados. Hoje lê do mock; no futuro, troque por fetch() aqui
// e as telas continuam iguais.
export function pesquisar(termo) {
  const t = termo.trim().toLowerCase(); // ignora espaços e maiúsculas
  if (!t) return []; // sem texto, sem resultados
  const resultados = [];
  linhas.forEach((l) => {
    // Casa pelo número ou pelo nome da linha
    if (l.numero.includes(t) || l.nome.toLowerCase().includes(t)) {
      resultados.push({ chave: `l-${l.id}`, tipo: "Linha", titulo: `${l.numero} · ${l.nome}`, linhaId: l.id });
    }
    // Casa pelo nome de cada ponto da linha
    l.pontos.forEach((p) => {
      if (p.nome.toLowerCase().includes(t)) {
        resultados.push({ chave: `p-${l.id}-${p.nome}`, tipo: "Ponto", titulo: p.nome, detalhe: `Linha ${l.numero}`, linhaId: l.id });
      }
    });
  });
  return resultados; // "chave" é única e serve de key do React
}

export const obterLinha = (id) => buscarLinha(id);
