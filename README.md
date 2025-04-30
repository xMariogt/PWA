# Guia de instalacion para PWA

### 1. Crear un proyecto de Angular
    ng new mi-app

### 2. Ya creado el proyecto, agregamos lo siguiente:

    ng add @angular/pwa
    ng add @angular/service-worker

### 3. Creamos los siguientes archivos y su configuracion basica

    ngsw-config.json
```json
{
    "index": "/index.html",
    "assetGroups": [
        {
            "name": "emprendimiento",
            "installMode": "prefetch",
            "resources": {
                "files": [
                    "/favicon.ico",
                    "/index.html",
                    "/*.css",
                    "/*.js"
                ]
            }
        },
        {
            "name": "assets",
            "installMode": "lazy",
            "updateMode": "prefetch",
            "resources": {
                "files": [
                    "/assets/**",
                    "/*.(png|jpg|jpeg|svg)"
                ]
            }
        }
    ]
}

```

    /src/manifest.webmanifest
```json
{
    "name": "Mi Angular PWA",
    "short_name": "AngularPWA",
    "start_url": "/",
    "display": "standalone",
    "theme_color": "#1976d2",
    "background_color": "#ffffff",
    "icons": [
        {
            "src": "assets/images/logo.png",
            "sizes": "192x192",
            "type": "image/png"
        },
        {
            "src": "assets/images/logo.png",
            "sizes": "512x512",
            "type": "image/png"
        }
    ]
}
```

    dentro de angular.json buscar lo siguiente:

```json
 "configurations": {
            "production": {
              "serviceWorker": "ngsw-config.json", // Linea que se debe agregar para que funcione
              "budgets": [
                {
                  "type": "initial",
                  "maximumWarning": "500kB",
                  "maximumError": "1MB"
                },
                {
                  "type": "anyComponentStyle",
                  "maximumWarning": "2kB",
                  "maximumError": "4kB"
                }
              ],
              "outputHashing": "all"
            },
            "development": {
              "optimization": false,
              "extractLicenses": false,
              "sourceMap": true
            }
          },
```

### 4. Se agrega el manifest en src/index.html
```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Emprendimiento</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
  <link rel="manifest" href="manifest.webmanifest"> <!-- Aqui se agrega el manifest para que funcione-->
</head>
<body>
  <app-root></app-root>
</body>
</html>

```

### 5. Crear los environment

    en el directorio /src/environments/ crear:

* environment.ts

```typescript
export const environment = {
    ServiceWorker: false
}
```

* environment.prod.ts

```typescript
export const environment = {
    ServiceWorker: true
}
```

### 6. Se agrega lo siguiente a app.config.ts

```typescript
    import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
// Imports necesarios
import { provideServiceWorker } from '@angular/service-worker'; 
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    // Bloque de codigo que se debe agregar
    ...(environment.ServiceWorker ? [provideServiceWorker('ngsw-worker.js')] : []),
    // ---------------------------------------
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes, withComponentInputBinding())]
};

```

### 7. Compila el proyecto en produccion y se sirve con HTTPS

    ng build --configuration production
    npx http-server -p 8080 -c-1 dist/emprendimiento/browser/
