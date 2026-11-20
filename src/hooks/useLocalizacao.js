import { useState, useEffect } from "react";

// Hook que entrega a posição do usuário: { posicao: [lat, lng] | null, erro: texto | null }
export default function useLocalizacao() {
  const [posicao, setPosicao] = useState(null); // começa sem posição
  const [erro, setErro] = useState(null); // mensagem para o usuário, se falhar

  useEffect(() => {
    // Navegadores muito antigos não têm geolocalização
    if (!navigator.geolocation) {
      setErro("Seu navegador não oferece localização.");
      return;
    }
    // watchPosition avisa a cada mudança de posição (o usuário se movendo)
    const id = navigator.geolocation.watchPosition(
      (p) => setPosicao([p.coords.latitude, p.coords.longitude]), // sucesso
      () => setErro("Permita o acesso à localização para ver pontos próximos."), // negou/falhou
      { enableHighAccuracy: true, maximumAge: 10000 } // GPS preciso; aceita posição de até 10 s
    );
    // Ao sair da tela, para de monitorar (evita gasto de bateria e vazamento)
    return () => navigator.geolocation.clearWatch(id);
  }, []); // [] = executa só uma vez, ao montar

  return { posicao, erro };
}
