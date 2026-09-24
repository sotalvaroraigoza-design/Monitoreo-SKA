import {useState} from "react";
const initial={name:"",ipAddress:"",description:"",location:"",type:"Server"};
export default function HostForm({onCreate}){
 const [form,setForm]=useState(initial);
 function handleChange(e){setForm(current=>({...current,[e.target.name]:e.target.value}));}
 async function handleSubmit(e){e.preventDefault();await onCreate(form);setForm(initial);}
 return <form className="panel form-grid" onSubmit={handleSubmit}>
  <div><label>Nombre</label><input name="name" value={form.name} onChange={handleChange} placeholder="Servidor Web" required/></div>
  <div><label>IP / Hostname</label><input name="ipAddress" value={form.ipAddress} onChange={handleChange} placeholder="192.168.1.50" required/></div>
  <div><label>Ubicación</label><input name="location" value={form.location} onChange={handleChange} placeholder="Oficina"/></div>
  <div><label>Tipo</label><select name="type" value={form.type} onChange={handleChange}><option>Server</option><option>Router</option><option>Workstation</option><option>Switch</option></select></div>
  <div className="full"><label>Descripción</label><input name="description" value={form.description} onChange={handleChange}/></div>
  <button className="primary full" type="submit">Agregar host</button>
 </form>;
}
