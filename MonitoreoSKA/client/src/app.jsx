import {useEffect,useState} from "react";
import Dashboard from "./pages/Dashboard";
import Hosts from "./pages/Hosts";
import Alerts from "./pages/Alerts";
import {api} from "./services/api";

export default function App(){
 const [page,setPage]=useState("dashboard"),[hosts,setHosts]=useState([]),[alerts,setAlerts]=useState([]),[message,setMessage]=useState("");
 async function loadData(){try{const [h,a]=await Promise.all([api.getHosts(),api.getAlerts()]);setHosts(h);setAlerts(a);}catch(e){setMessage(e.message);}}
 useEffect(()=>{loadData();},[]);
 async function createHost(h){try{await api.createHost(h);setMessage("Host agregado correctamente.");await loadData();}catch(e){setMessage(e.message);}}
 async function deleteHost(id){if(!window.confirm("¿Eliminar este host?"))return;try{await api.deleteHost(id);setMessage("Host eliminado.");await loadData();}catch(e){setMessage(e.message);}}
 async function pingHost(h){try{const r=await api.pingHost(h.id);setMessage(`${h.name}: ${r.reachable?`respuesta en ${r.latencyMs} ms`:"sin respuesta"}.`);await loadData();}catch(e){setMessage(e.message);}}
 async function scanHost(h){try{const r=await api.scanHost(h.id);setMessage(`${h.name}: ${r.filter(p=>p.status==="OPEN").length} puerto(s) abierto(s) simulados.`);}catch(e){setMessage(e.message);}}
 async function acknowledgeAlert(id){await api.acknowledgeAlert(id);await loadData();}
 async function resolveAlert(id){await api.resolveAlert(id);await loadData();}
 return <div className="app-shell"><aside className="sidebar"><div className="brand"><div className="brand-mark">S</div><div><strong>MonitoreoSKA</strong><small>Network Monitor</small></div></div>
 <nav><button className={page==="dashboard"?"nav-active":""} onClick={()=>setPage("dashboard")}>Dashboard</button><button className={page==="hosts"?"nav-active":""} onClick={()=>setPage("hosts")}>Hosts</button><button className={page==="alerts"?"nav-active":""} onClick={()=>setPage("alerts")}>Alertas</button></nav>
 <div className="sidebar-note"><strong>Primer entregable</strong><span>React + JavaScript + API Node.js</span></div></aside>
 <main className="main-content">{message&&<div className="toast">{message}<button onClick={()=>setMessage("")}>×</button></div>}
 {page==="dashboard"&&<Dashboard hosts={hosts} alerts={alerts} onRefresh={loadData}/>}
 {page==="hosts"&&<Hosts hosts={hosts} onCreate={createHost} onPing={pingHost} onScan={scanHost} onDelete={deleteHost}/>}
 {page==="alerts"&&<Alerts alerts={alerts} onAcknowledge={acknowledgeAlert} onResolve={resolveAlert}/>}</main></div>;
}