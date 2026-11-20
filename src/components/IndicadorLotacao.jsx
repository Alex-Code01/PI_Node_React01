// Converte o percentual em rótulo e nível de cor.
export function classificar(pct) {
  if (pct < 40) return { texto: "Vazio", nivel: "baixa" };
  if (pct < 75) return { texto: "Moderado", nivel: "media" };
  return { texto: "Cheio", nivel: "alta" };
}

// Mostra uma barra preenchida + o rótulo. Recebe só o percentual (0 a 100).
export default function IndicadorLotacao({ percentual }) {
  const { texto, nivel } = classificar(percentual);
  return (
    // role="status" + aria-label: leitores de tela anunciam a lotação em texto
    <div className="lotacao" role="status" aria-label={`Lotação estimada: ${texto}, ${percentual}%`}>
      <div className="lotacao-barra">
        {/* A largura da barra é o próprio percentual; a classe define a cor */}
        <div className={`lotacao-nivel ${nivel}`} style={{ width: `${percentual}%` }} />
      </div>
      <strong>{texto}</strong>
      <span>{percentual}% (estimado)</span>
    </div>
  );
}
