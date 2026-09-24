const API_URL = "http://localhost:3001/api";

async function request(path, options = {}) {
    const res = await fetch(`${API_URL}${path}`, { headers: { "Content-Type": "application/json", ...(options.headers || {}) }, ...options });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Error en la API");
    return data;
}

export const api = {
    getHosts: () => request("/hosts"),
    createHost: (host) => request("/hosts", { method: "POST", body: JSON.stringify(host) }),
    deleteHost: (id) => request(`/hosts/${id}`, { method: "DELETE" }),
    pingHost: (id) => request(`/hosts/${id}/ping`, { method: "POST" }),
    scanHost: (id) => request(`/hosts/${id}/scan`, { method: "POST" }),
    getAlerts: () => request("/alerts"),
    acknowledgeAlert: (id) => request(`/alerts/${id}/acknowledge`, { method: "POST" }),
    resolveAlert: (id) => request(`/alerts/${id}/resolve`, { method: "POST" })
};