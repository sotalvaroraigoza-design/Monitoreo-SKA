export default function StatusBadge({status}){
 const labels={ONLINE:"En línea",OFFLINE:"Fuera de línea",DEGRADED:"Degradado",UNKNOWN:"Desconocido",ACTIVE:"Activa",ACKNOWLEDGED:"Reconocida",RESOLVED:"Resuelta"};
 return <span className={`badge badge-${status.toLowerCase()}`}>{labels[status]||status}</span>;
}
