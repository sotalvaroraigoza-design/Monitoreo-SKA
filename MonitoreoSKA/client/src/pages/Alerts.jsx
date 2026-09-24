import AlertList from "../components/AlertList";
export default function Alerts({alerts,onAcknowledge,onResolve}){return <><div className="page-heading"><div><h1>Alertas</h1><p>Eventos generados por el monitoreo simulado.</p></div></div><AlertList alerts={alerts} onAcknowledge={onAcknowledge} onResolve={onResolve}/></>;}
