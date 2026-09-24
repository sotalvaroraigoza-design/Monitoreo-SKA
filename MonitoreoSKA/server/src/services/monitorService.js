import {alerts,getNextAlertId,getNextPingId,pingHistory,ports} from "../data/db.js";

export function simulatePing(host){
  const reachable=host.status!=="OFFLINE";
  const latency=reachable?Number((Math.random()*18+2).toFixed(1)):null;
  const result={id:getNextPingId(),hostId:host.id,latencyMs:latency,reachable,packetLoss:reachable?0:100,recordedAt:new Date().toISOString()};
  pingHistory.unshift(result);
  host.lastLatency=latency;
  host.lastSeen=result.recordedAt;
  if(!reachable && !alerts.some(a=>a.hostId===host.id&&a.alertType==="HOST_DOWN"&&a.status==="ACTIVE")){
    alerts.unshift({id:getNextAlertId(),hostId:host.id,alertType:"HOST_DOWN",severity:"CRITICAL",title:"Host fuera de línea",message:`${host.name} no responde al ping.`,status:"ACTIVE",createdAt:result.recordedAt});
  }
  return result;
}
export function simulatePortScan(host){
  return ports.filter(p=>p.hostId===host.id).map(p=>({...p,scannedAt:new Date().toISOString()}));
}
