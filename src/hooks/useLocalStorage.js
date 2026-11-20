import { useState, useEffect } from "react";

// Funciona como useState, mas guarda o valor no navegador (localStorage),
// então ele sobrevive ao recarregar a página. Usado por login, favoritos e reportes.
export default function useLocalStorage(chave, inicial) {
  // Função dentro do useState roda só na primeira renderização
  const [valor, setValor] = useState(() => {
    try {
      const salvo = localStorage.getItem(chave); // texto salvo ou null
      return salvo ? JSON.parse(salvo) : inicial; // converte de volta para objeto/lista
    } catch {
      return inicial; // storage bloqueado ou JSON inválido: usa o valor inicial
    }
  });

  // Sempre que o valor muda, grava de novo no navegador
  useEffect(() => {
    try {
      localStorage.setItem(chave, JSON.stringify(valor));
    } catch {
      /* sem espaço ou bloqueado: o app continua funcionando só em memória */
    }
  }, [chave, valor]);

  return [valor, setValor];
}
