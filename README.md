# Playwright Automation Demo (Docker)

Este proyecto es una estructura base para automatización de pruebas con **Playwright**, ejecutada íntegramente desde **Docker** para mantener el entorno local limpio.

## 🚀 Arquitectura
- **Framework**: Playwright (TypeScript)
- **Ejecución**: Docker Compose (Imagen oficial de Playwright)
- **Sitio de Pruebas**: [The Internet (Herokuapp)](https://the-internet.herokuapp.com/)

## 📂 Estructura del Proyecto
- `tests/`: Contiene los archivos de prueba (.spec.ts).
- `playwright.config.ts`: Configuración global de Playwright.
- `docker-compose.yml`: Orquestación del contenedor.
- `.gitignore`: Archivos excluidos de control de versiones (node_modules, reportes, etc).

## 🛠️ Flujo de Trabajo (Build & Run)

Este proyecto separa el proceso de construcción de la imagen del de ejecución de los tests:

### 1. Construir la imagen del contenedor
Ejecuta esto la primera vez o cuando realices cambios en el `package.json`:
```bash
docker-compose build
```

### 2. Ejecutar las pruebas
Lanza la suite de tests (se ejecutará automáticamente en base al `Dockerfile`):
```bash
docker-compose up
```
> [!TIP]
> Si deseas ejecutar los tests sin que Docker intente buscar cambios, puedes usar `docker-compose up --no-build`.

## 🧪 Tests Incluidos (10/10 Pasando)
1.  **Navegación**: Validación de carga de Home.
2.  **Checkboxes**: Interacción con cuadros de selección.
3.  **Dropdown**: Selección de opciones en listas.
4.  **Inputs**: Validación de campos numéricos.
5.  **Hovers**: Interacción con elementos flotantes.
6.  **JS Alerts**: Manejo de diálogos nativos.
7.  **Multiple Windows**: Gestión de nuevas pestañas.
8.  **Dynamic Loading**: Sincronización asíncrona (espera de elementos).
9.  **Form Auth**: Prueba de Login exitoso.
10. **Drag and Drop**: Arrastrar y soltar elementos.
