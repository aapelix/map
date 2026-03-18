import { useEffect } from "preact/hooks";
import L, { latLng } from "leaflet";
import { news as newsData } from "./data";

import iconUrl from "leaflet/dist/images/marker-icon.png?url";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png?url";
import shadowUrl from "leaflet/dist/images/marker-shadow.png?url";

const DefaultIcon = L.icon({
  iconUrl,
  iconRetinaUrl,
  shadowUrl,

  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

L.Marker.prototype.options.icon = DefaultIcon;

export function App() {
  useEffect(() => {
    const map = L.map("map").setView([20, 0], 2);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    newsData.forEach((news) => {
      const marker = L.marker(latLng(news.pos[0], news.pos[1])).addTo(map);

      marker.bindPopup(`
        <div>
          <h3>${news.title}</h3>
          <p>${news.desc}</p>
          <a href="${news.url}" target="_blank">${news.url}</a>
        </div>
      `);
    });

    return () => map.remove();
  }, []);

  return (
    <div>
      <div id="map" style={{ width: "100vw", height: "100vh" }}></div>
    </div>
  );
}
