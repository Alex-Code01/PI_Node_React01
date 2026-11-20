import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, CircleMarker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // estilos obrigatórios do Leaflet
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import shadow from "leaflet/dist/images/marker-shadow.png";

// Correção conhecida: bundlers quebram o caminho dos ícones padrão do Leaflet.
L.Marker.prototype.options.icon = L.icon({ iconUrl: icon, shadowUrl: shadow, iconAnchor: [12, 41] });

// Ícone do ônibus: um emoji dentro de um divIcon (não precisa de imagem)
const iconeOnibus = L.divIcon({ className: "onibus-icone", html: "🚌", iconSize: [32, 32], iconAnchor: [16, 16] });
const RECIFE = [-8.0476, -34.877]; // centro padrão quando não há GPS

// Componentes dentro do mapa usam useMap() para controlar a câmera.
// Centralizar: leva a câmera ao usuário quando a posição chega/muda.
function Centralizar({ alvo }) {
  const map = useMap();
  useEffect(() => {
    if (alvo) map.setView(alvo, map.getZoom()); // mantém o zoom atual
  }, [alvo, map]);
  return null; // não desenha nada
}

// Ajustar: enquadra a linha inteira na tela.
function Ajustar({ linha }) {
  const map = useMap();
  useEffect(() => {
    if (linha) map.fitBounds(linha.pontos.map((p) => p.pos), { padding: [40, 40] });
  }, [linha, map]);
  return null;
}

// Props: posicao (usuário), linha (traçado opcional), onibus (marcador opcional)
export default function Mapa({ posicao, linha, onibus }) {
  return (
    <MapContainer center={posicao || RECIFE} zoom={13} className="mapa">
      {/* Imagens do mapa vindas do OpenStreetMap (gratuito, sem chave) */}
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap" />
      {/* Com linha, enquadra a linha; sem linha, segue o usuário */}
      {linha ? <Ajustar linha={linha} /> : <Centralizar alvo={posicao} />}
      {posicao && (
        <Marker position={posicao}>
          <Popup>Você está aqui</Popup>
        </Marker>
      )}
      {linha && (
        <>
          {/* Traçado da linha ligando os pontos em ordem */}
          <Polyline positions={linha.pontos.map((p) => p.pos)} pathOptions={{ color: linha.cor, weight: 5 }} />
          {/* Um círculo por ponto de parada, com o nome no popup */}
          {linha.pontos.map((p) => (
            <CircleMarker key={p.nome} center={p.pos} radius={7} pathOptions={{ color: linha.cor, fillColor: "#fff", fillOpacity: 1 }}>
              <Popup>{p.nome}</Popup>
            </CircleMarker>
          ))}
        </>
      )}
      {/* Ônibus em movimento */}
      {onibus && <Marker position={onibus.pos} icon={iconeOnibus} />}
    </MapContainer>
  );
}
