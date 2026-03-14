# Guía de Implementación Completa

## Arquitectura
```
Frontend (Next.js:3000) ↔ Backend (Flask:5000) ↔ Samsung Device (ADB)
                              ↓
                       Dashboard (3002)
```

## Instalación
```bash
cd /workspaces/sardin1
pip install -r backend/requirements.txt
cd frontend && npm install && cd ..
flask --app backend/app run --debug  # or docker-compose up
```

## Config
- backend/.env: ADB_PATH, GEMINI_API_KEY, MEXICO_COMPLIANCE=true

## Uso
1. Conectar Samsung USB/Debug
2. localhost:3000/mdm/dashboard
3. Diagnose → AI Fix → Verify

See README.md for details.

