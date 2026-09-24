import HostForm from "../components/HostForm";
import HostTable from "../components/HostTable";
export default function Hosts(props){return <><div className="page-heading"><div><h1>Hosts</h1><p>Administración de dispositivos monitorizados.</p></div></div><HostForm onCreate={props.onCreate}/><HostTable {...props}/></>;}
