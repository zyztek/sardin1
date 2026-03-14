# API Reference

## MDM Endpoints (POST /api/mdm/*)
- GET /diagnose: Device info
- POST /unlock: {package: 'com.payjoy...'}
- POST /ai-fix: {device_info, last_error}
- POST /payjoy-remove: Mexico-specific
- GET /stats: Operation metrics

Auth: JWT header.

