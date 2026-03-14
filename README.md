# Samsung MDM/Knox Removal Tool

## 🚀 Puesta en Marcha Rápida

### Requisitos Previos
- Windows 10/11 or Linux
- Node.js 18+ 
- Python 3.10+
- Git
- Android SDK Platform Tools (ADB)
- Samsung USB Drivers

### Instalación en 5 Minutos

```bash
# 1. Clonar proyecto
git clone <repo> samsung-mdm-remover
cd samsung-mdm-remover

# 2. Setup automático
scripts\\setup.bat  # Windows
# or bash scripts/setup.sh (Linux)

# 3. Configurar .env
cp backend/.env.example backend/.env
# Edit ADB_PATH, GEMINI_API_KEY

# 4. Iniciar
docker-compose up -d  # Recommended
# or manual:
# cd backend && flask --app app run -p 5000
# cd frontend && npm run dev -p 3000
# cd dashboard && npm run dev -p 3002
```

### Acceso
- **Frontend**: http://localhost:3000/mdm/dashboard
- **Backend API**: http://localhost:5000/api/mdm/diagnose  
- **Admin Dashboard**: http://localhost:3002

## 📱 Uso
1. Conectar Samsung, USB Debug ON
2. Diagnose device
3. AI Fix / Payjoy Remove
4. Verify

## ⚠️ Legal
Solo uso legítimo. Ver [docs/LEGAL-MEXICO.md](docs/LEGAL-MEXICO.md)

## Full Docs
[Implementation](docs/IMPLEMENTATION.md) | [API](docs/API.md) | [Troubleshoot](docs/TROUBLESHOOTING.md)

**México Focus: Payjoy, Knox, Compliance ready.**

