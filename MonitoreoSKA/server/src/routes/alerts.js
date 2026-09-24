import {Router} from "express";
import {alerts,hosts} from "../data/db.js";
const router=Router();

router.get("/",(req,res)=>res.json(alerts.map(a=>({...a,hostName:hosts.find(h=>h.id===a.hostId)?.name??"Desconocido"}))));
router.get("/recent",(req,res)=>res.json(alerts.slice(0,10)));
router.post("/:id/acknowledge",(req,res)=>{
  const a=alerts.find(x=>x.id===Number(req.params.id));
  if(!a)return res.status(404).json({message:"Alerta no encontrada"});
  a.status="ACKNOWLEDGED"; res.json(a);
});
router.post("/:id/resolve",(req,res)=>{
  const a=alerts.find(x=>x.id===Number(req.params.id));
  if(!a)return res.status(404).json({message:"Alerta no encontrada"});
  a.status="RESOLVED"; res.json(a);
});
export default router;
