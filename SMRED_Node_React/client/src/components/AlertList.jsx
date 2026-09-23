import StatusBadge from "./StatusBadge";
export default function AlertList({alerts,onAcknowledge,onResolve}){
 return <div className="alert-list">{alerts.map(a=><article className="panel alert-item" key={a.id}><div><strong>{a.title}</strong><p>{a.message}</p><small>{a.hostName||"Host"} · {a.createdAt}</small></div>
 <div className="alert-actions"><StatusBadge status={a.status}/>{a.status==="ACTIVE"&&<button onClick={()=>onAcknowledge(a.id)}>Reconocer</button>}{a.status!=="RESOLVED"&&<button onClick={()=>onResolve(a.id)}>Resolver</button>}</div></article>)}</div>;
}
