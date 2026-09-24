import { useEffect, useState } from "react";
import Dashboard from "./pages/Dashboard";
import Hosts from "./pages/Hosts";
import Alerts from "./pages/Alerts";
import { api } from "./services/api";

export default function App() {
    const [page, setPage] = useState("dashboard");
    const [hosts, setHosts] = useState([]);
    const [alerts, setAlerts] = useState([]);
    const [message, setMessage] = useState("");

    async function loadData() {
        try {
            const [h, a] = await Promise.all([
                api.getHosts(),
                api.getAlerts()
            ]);

            setHosts(h);
            setAlerts(a);
        } catch (e) {
            setMessage(e.message);
        }
    }

    useEffect(() => {
        loadData();
    }, []);

    async function createHost(host) {
        try {
            await api.createHost(host);
            setMessage("Host agregado correctamente.");
            await loadData();
        } catch (e) {
            setMessage(e.message);
        }
    }

    async function deleteHost(id) {
        if (!window.confirm("¿Eliminar este host?")) {
            return;
        }

        try {
            await api.deleteHost(id);
            setMessage("Host eliminado.");
            await loadData();
        } catch (e) {
            setMessage(e.message);
        }
    }

    async function pingHost(host) {
        try {
            const result = await api.pingHost(host.id);

            if (result.reachable) {
                setMessage(
                    `${host.name}: respuesta en ${result.latencyMs} ms.`
                );
            } else {
                setMessage(`${host.name}: sin respuesta.`);
            }

            await loadData();
        } catch (e) {
            setMessage(e.message);
        }
    }

    async function scanHost(host) {
        try {
            const result = await api.scanHost(host.id);

            const openPorts = result.filter(
                port => port.status === "OPEN"
            ).length;

            setMessage(
                `${host.name}: ${openPorts} puerto(s) abierto(s) simulados.`
            );
        } catch (e) {
            setMessage(e.message);
        }
    }

    async function acknowledgeAlert(id) {
        try {
            await api.acknowledgeAlert(id);
            await loadData();
        } catch (e) {
            setMessage(e.message);
        }
    }

    async function resolveAlert(id) {
        try {
            await api.resolveAlert(id);
            await loadData();
        } catch (e) {
            setMessage(e.message);
        }
    }

    return (
        <div className="app-shell">

            <aside className="sidebar">

                <div className="brand">
                    <div className="brand-mark">S</div>

                    <div>
                        <strong>MonitoreoSKA</strong>
                        <small>Monitoreo de Sistemas</small>
                    </div>
                </div>

                <nav>

                    <button
                        className={page === "dashboard" ? "nav-active" : ""}
                        onClick={() => setPage("dashboard")}
                    >
                        Dashboard
                    </button>

                    <button
                        className={page === "hosts" ? "nav-active" : ""}
                        onClick={() => setPage("hosts")}
                    >
                        Hosts
                    </button>

                    <button
                        className={page === "alerts" ? "nav-active" : ""}
                        onClick={() => setPage("alerts")}
                    >
                        Alertas
                    </button>

                </nav>

                <div className="sidebar-note">
                    <strong>Tecnologico de Antioquia</strong>
                    <span>
                        Proyecto de Monitoreo de Sistemas - 2026
                    </span>
                </div>

            </aside>

            <main className="main-content">

                {message && (
                    <div className="toast">
                        <span>{message}</span>

                        <button
                            onClick={() => setMessage("")}
                        >
                            ×
                        </button>
                    </div>
                )}

                {page === "dashboard" && (
                    <Dashboard
                        hosts={hosts}
                        alerts={alerts}
                        onRefresh={loadData}
                    />
                )}

                {page === "hosts" && (
                    <Hosts
                        hosts={hosts}
                        onCreate={createHost}
                        onPing={pingHost}
                        onScan={scanHost}
                        onDelete={deleteHost}
                    />
                )}

                {page === "alerts" && (
                    <Alerts
                        alerts={alerts}
                        onAcknowledge={acknowledgeAlert}
                        onResolve={resolveAlert}
                    />
                )}

            </main>

        </div>
    );
}