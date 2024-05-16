import { MapContainer, TileLayer } from "react-leaflet";
import "./Map.scss";
import "leaflet/dist/leaflet.css";
import Pin from "../Pin/Pin";

const Map = ({ items }) => {
  //por cada item voy a mostrar diferentes markers(pin)
  const position = [52.4797, -1.90269];
  return (
    <MapContainer
      center={
        items.length === 1 ? [items[0].latitude, items[0].longitude] : position
      }
      zoom={7}
      scrollWheelZoom={false}
      className="map"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {items.map((item) => (
        <Pin item={item} key={item.id} />
      ))}
    </MapContainer>
  );
};

export default Map;
