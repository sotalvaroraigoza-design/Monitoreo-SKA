export const hosts = [
  {id:1,name:"Router Principal",ipAddress:"192.168.1.1",description:"Puerta de enlace",location:"Oficina",type:"Router",status:"ONLINE",active:true,lastLatency:2.8,lastSeen:"2026-09-23T09:45:00"},
  {id:2,name:"Servidor Web",ipAddress:"192.168.1.10",description:"Servidor de aplicaciones",location:"Servidor",type:"Server",status:"ONLINE",active:true,lastLatency:8.4,lastSeen:"2026-09-23T09:44:00"},
  {id:3,name:"PC Administración",ipAddress:"192.168.1.25",description:"Equipo administrativo",location:"Administración",type:"Workstation",status:"OFFLINE",active:true,lastLatency:null,lastSeen:"2026-09-23T08:58:00"}
];

export const alerts = [
  {id:1,hostId:3,alertType:"HOST_DOWN",severity:"CRITICAL",title:"Host fuera de línea",message:"PC Administración no responde.",status:"ACTIVE",createdAt:"2026-09-23T09:00:00"},
  {id:2,hostId:2,alertType:"HIGH_LATENCY",severity:"WARNING",title:"Latencia elevada",message:"El servidor web presenta latencia superior al umbral.",status:"ACTIVE",createdAt:"2026-09-23T09:20:00"}
];

export const pingHistory = [
  {id:1,hostId:1,latencyMs:2.8,reachable:true,packetLoss:0,recordedAt:"2026-09-23T09:45:00"},
  {id:2,hostId:1,latencyMs:3.1,reachable:true,packetLoss:0,recordedAt:"2026-09-23T09:40:00"},
  {id:3,hostId:2,latencyMs:8.4,reachable:true,packetLoss:0,recordedAt:"2026-09-23T09:44:00"},
  {id:4,hostId:3,latencyMs:null,reachable:false,packetLoss:100,recordedAt:"2026-09-23T08:58:00"}
];

export const ports = [
  {id:1,hostId:1,portNumber:80,protocol:"TCP",status:"OPEN",serviceName:"HTTP"},
  {id:2,hostId:1,portNumber:443,protocol:"TCP",status:"OPEN",serviceName:"HTTPS"},
  {id:3,hostId:2,portNumber:8080,protocol:"TCP",status:"OPEN",serviceName:"HTTP-ALT"},
  {id:4,hostId:2,portNumber:3306,protocol:"TCP",status:"FILTERED",serviceName:"MySQL"}
];

let nextHostId=4,nextAlertId=3,nextPingId=5;
export const getNextHostId=()=>nextHostId++;
export const getNextAlertId=()=>nextAlertId++;
export const getNextPingId=()=>nextPingId++;
