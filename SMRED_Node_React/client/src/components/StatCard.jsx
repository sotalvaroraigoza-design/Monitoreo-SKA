export default function StatCard({title,value,detail}){
  return <article className="stat-card"><span>{title}</span><strong>{value}</strong><small>{detail}</small></article>;
}
