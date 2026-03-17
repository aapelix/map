import { render } from "preact";
import "./index.css";
import "leaflet/dist/leaflet.css";
import { App } from "./app.tsx";

render(<App />, document.getElementById("app")!);
