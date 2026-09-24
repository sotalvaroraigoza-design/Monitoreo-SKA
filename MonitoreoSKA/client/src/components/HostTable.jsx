import StatusBadge from "./StatusBadge";
export default function HostTable({hosts,onPing,onScan,onDelete}){
 return <div className="panel table-wrap"><table><thead><tr><th>Host</th><th>IP</th><th>Tipo</th><th>Estado</th><th>Latencia</th><th>Acciones</th></tr></thead>
 <tbody>{hosts.map(host=><tr key={host.id}><td><strong>{host.name}</strong><br/><small>{host.location}</small></td><td>{host.ipAddress}</td><td>{host.type}</td><td><StatusBadge status={host.status}/></td><td>{host.lastLatency==null?"—":`${host.lastLatency} ms`}</td>
 <td className="actions"><button onClick={()=>onPing(host)}>Ping</button><button onClick={()=>onScan(host)}>Puertos</button><button className="danger" onClick={()=>onDelete(host.id)}>Eliminar</button></td></tr>)}</tbody></table></div>;
}
