import StatCard from "../components/StatCard";
import StatusBadge from "../components/StatusBadge";
export default function Dashboard({hosts,alerts,onRefresh}){
 const online=hosts.filter(h=>h.status==="ONLINE").length,offline=hosts.filter(h=>h.status==="OFFLINE").length,active=alerts.filter(a=>a.status==="ACTIVE").length;
 return <><div className="page-heading"><div><h1>Dashboard de monitoreo</h1><p>Vista inicial de MonitoreoSKA migrada a React.</p></div><button className="primary" onClick={onRefresh}>Actualizar</button></div>
 <section className="stats"><StatCard title="Hosts registrados" value={hosts.length} detail="Dispositivos simulados"/><StatCard title="En línea" value={online} detail="Respuesta disponible"/><StatCard title="Fuera de línea" value={offline} detail="Requieren revisión"/><StatCard title="Alertas activas" value={active} detail="Eventos pendientes"/></section>
 <section className="panel"><div className="section-title"><h2>Estado de la red</h2><span>Datos de demostración</span></div><div className="mini-grid">{hosts.map(h=><div className="mini-host" key={h.id}><div><strong>{h.name}</strong><small>{h.ipAddress}</small></div><StatusBadge status={h.status}/></div>)}</div></section></>;
}
