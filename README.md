# Diteria Home

Proyecto web estático para Diteria.

## Estructura del proyecto

```
.
├── index.html          # Página principal
├── css/               # Estilos CSS
│   └── styles.css
├── js/                # JavaScript
│   └── main.js
├── images/            # Imágenes del proyecto
├── assets/            # Otros recursos
└── .github/
    └── workflows/
        └── deploy.yml # GitHub Actions para deploy
```

## Despliegue

El sitio se despliega automáticamente en GitHub Pages cuando se hace push a la rama `main`.

### Configurar GitHub Pages

1. Ve a Settings → Pages en tu repositorio
2. En "Source", selecciona "GitHub Actions"
3. El sitio se desplegará automáticamente con cada push

## Desarrollo local

Simplemente abre `index.html` en tu navegador o usa un servidor local:

```bash
# Con Python 3
python -m http.server 8000

# Con Node.js (http-server)
npx http-server
```

Luego visita `http://localhost:8000` en tu navegador.
