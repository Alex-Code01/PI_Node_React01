// DADOS FICTÍCIOS do MVP (coordenadas aproximadas de Recife).
// Cada linha tem: id, numero, nome, cor (usada no mapa), pontos e lotacao.
// pontos: lista ordenada de { nome, pos: [latitude, longitude] }.
// lotacao: percentual por trecho; lotacao[i] vale entre o ponto i e o ponto i+1.
export const linhas = [
  {
    id: "001", // identificador usado na URL (/linha/001)
    numero: "001", // número exibido ao usuário
    nome: "Boa Viagem / Marco Zero",
    cor: "#0f766e", // cor do traçado e do selo
    pontos: [
      { nome: "Shopping Recife", pos: [-8.1196, -34.906] },
      { nome: "Pracinha de Boa Viagem", pos: [-8.126, -34.901] },
      { nome: "Terminal Joana Bezerra", pos: [-8.074, -34.892] },
      { nome: "Marco Zero", pos: [-8.063, -34.871] },
    ],
    lotacao: [25, 60, 85], // 4 pontos => 3 trechos => 3 valores
  },
  {
    id: "002",
    numero: "002",
    nome: "UFPE / Derby",
    cor: "#b45309",
    pontos: [
      { nome: "UFPE", pos: [-8.0505, -34.951] },
      { nome: "Cordeiro", pos: [-8.053, -34.923] },
      { nome: "Praça do Derby", pos: [-8.0577, -34.8996] },
      { nome: "Marco Zero", pos: [-8.063, -34.871] },
    ],
    lotacao: [90, 55, 30],
  },
];

// Devolve a linha cujo id é igual ao informado (ou undefined se não existir).
export const buscarLinha = (id) => linhas.find((l) => l.id === id);
