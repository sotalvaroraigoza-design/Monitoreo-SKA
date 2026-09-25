# MonitoreoSKA – Primer entregable con Node.js + React

El proyecto MonitoreoSKA original es hecho a base de una arquitectura educativa con **Node.js/Express + React/Vite**.

## Funciones
- Dashboard.
- CRUD básico de hosts.
- Ping simulado.
- Escaneo de puertos simulado.
- Alertas y cambio de estado.
- Componentes React reutilizables.
- useState/useEffect.
- map().
- Eventos onClick, onChange y onSubmit.
- API REST.
- Datos simulados en arreglos JavaScript.

## Base de datos
No se utiliza MySQL en esta entrega. La rúbrica solicita datos simulados en arreglos JSON y sin base de datos. Los datos están en `server/src/data/db.js`.

## Requisitos
Node.js 18+ recomendado y VS Code.

## Ejecutar
Desde la raíz:
`npm run install-all`

Terminal 1:
`npm run server`

Terminal 2:
`npm run client`

Abrir `http://localhost:5173`.

API: `http://localhost:3001/api/health`

## Endpoints
GET `/api/hosts`
POST `/api/hosts`
PUT `/api/hosts/:id`
DELETE `/api/hosts/:id`
POST `/api/hosts/:id/ping`
GET `/api/hosts/:id/ping-history`
POST `/api/hosts/:id/scan`
GET `/api/hosts/:id/ports`
GET `/api/alerts`
POST `/api/alerts/:id/acknowledge`
POST `/api/alerts/:id/resolve`

## GitHub
`MonitoreoSKA` y ejecutar:
`git init`
`git add .`
`git commit -m "Primer entregable MonitoreoSKA con React y Node.js"`
`git branch -M main`
`git remote add origin URL_DEL_REPOSITORIO`
`git push -u origin main`

