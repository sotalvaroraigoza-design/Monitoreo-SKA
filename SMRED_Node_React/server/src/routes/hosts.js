import {Router} from "express";
import {hosts,ports,pingHistory,getNextHostId} from "../data/db.js";
import {simulatePing,simulatePortScan} from "../services/monitorService.js";

const router=Router();

router.get("/",(req,res)=>res.json(hosts));
router.get("/:id",(req,res)=>{
  const host=hosts.find(h=>h.id===Number(req.params.id));
  if(!host)return res.status(404).json({message:"Host no encontrado"});
  res.json(host);
});
router.post("/",(req,res)=>{
  const {name,ipAddress,description="",location="",type="Host"}=req.body;
  if(!name?.trim()||!ipAddress?.trim())return res.status(400).json({message:"name e ipAddress son obligatorios"});
  if(hosts.some(h=>h.ipAddress===ipAddress.trim()))return res.status(409).json({message:"La IP/hostname ya existe"});
  const host={id:getNextHostId(),name:name.trim(),ipAddress:ipAddress.trim(),description,location,type,status:"UNKNOWN",active:true,lastLatency:null,lastSeen:null};
  hosts.push(host); res.status(201).json(host);
});
router.put("/:id",(req,res)=>{
  const host=hosts.find(h=>h.id===Number(req.params.id));
  if(!host)return res.status(404).json({message:"Host no encontrado"});
  Object.assign(host,{name:req.body.name??host.name,ipAddress:req.body.ipAddress??host.ipAddress,description:req.body.description??host.description,location:req.body.location??host.location,type:req.body.type??host.type});
  res.json(host);
});
router.delete("/:id",(req,res)=>{
  const i=hosts.findIndex(h=>h.id===Number(req.params.id));
  if(i<0)return res.status(404).json({message:"Host no encontrado"});
  const [deleted]=hosts.splice(i,1); res.json({message:"Host eliminado",host:deleted});
});
router.post("/:id/ping",(req,res)=>{
  const host=hosts.find(h=>h.id===Number(req.params.id));
  if(!host)return res.status(404).json({message:"Host no encontrado"});
  res.json(simulatePing(host));
});
router.get("/:id/ping-history",(req,res)=>res.json(pingHistory.filter(p=>p.hostId===Number(req.params.id))));
router.post("/:id/scan",(req,res)=>{
  const host=hosts.find(h=>h.id===Number(req.params.id));
  if(!host)return res.status(404).json({message:"Host no encontrado"});
  res.json(simulatePortScan(host));
});
router.get("/:id/ports",(req,res)=>res.json(ports.filter(p=>p.hostId===Number(req.params.id))));

export default router;
