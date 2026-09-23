import express from "express";
import cors from "cors";
import hostsRouter from "./routes/hosts.js";
import alertsRouter from "./routes/alerts.js";

const app=express();
const PORT=process.env.PORT||3001;
app.use(cors());
app.use(express.json());
app.get("/api/health",(req,res)=>res.json({status:"OK",project:"MonitoreoSKA Node.js API",database:"simulated-memory"}));
app.use("/api/hosts",hostsRouter);
app.use("/api/alerts",alertsRouter);
app.use((req,res)=>res.status(404).json({message:"Ruta no encontrada"}));
app.listen(PORT,()=>console.log(`MonitoreoSKA API: http://localhost:${PORT}`));
