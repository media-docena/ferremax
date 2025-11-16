# Ferremax 🔧

Sistema de gestión para ferretería desarrollado con Node.js, Express y React.

## 📋 Descripción

Ferremax es una aplicación web que permite gestionar de manera integral los procesos de una ferretería. Incluye módulos de control de stock, ventas, usuarios, proveedores y reportes, con una interfaz moderna y fácil de usar.

## 🚀 Tecnologías y Herramientas de Desarrollo

### Backend 
- Node.js : Entorno de ejecucion para JavaScript del lado del servidor.
- Express : Framework para la creacion de servidores HTTP y manejo de rutas.
- Nodemon : Utilidad para reiniciar automáticamente el servidor durante el desarrollo.

## 📦 Dependencias Principales
- Express: Framework web
- Prisma: ORM para MySQL
- JWT: Autenticación token-based
- bcrypt: Hash contraseñas
- express-validator: Validación inputs
- Jest + Supertest: Testing
- Pino: Logger
- Swagger: Documentación API
- date-fns: Manejo fechas
- @json2csv/plainjs: Exportación a CSV

## Estructura de carpetas del backend
```bash
backend/
│
├── 📁 __tests__/                          # Tests automatizados
│   ├── setup.test.js                      # Verificación configuración Jest
│   ├── productos.service.test.js          # Tests unitarios servicio productos
│   └── integracion_ventas.test.js         # Tests integración flujo ventas
│
├── 📁 bin/
│   └── www                                # Punto entrada servidor HTTP
│
├── 📁 config/
│   └── logger.js                          # Configuración logger Pino
│
├── 📁 controllers/                        # Capa de controladores (manejo requests)
│   ├── auth_controller.js                 # Login y JWT
│   ├── carrito_venta_controller.js        # Gestión de carrito y ventas
│   ├── categorias_controller.js           # CRUD categorías
│   ├── marcas_controller.js               # CRUD marcas
│   ├── productos_controller.js            # CRUD productos + exportar CSV
│   ├── proveedores_controller.js          # CRUD proveedores
│   ├── roles_controller.js                # CRUD roles
│   ├── unidades_controller.js             # CRUD unidades medida
│   ├── usuarios_controller.js             # CRUD usuarios + empleados
│   ├── ventas_controller.js               # Reportes ventas + top productos
│   └── utils.js                           # Helper para mensajes de estado
│
├── 📁 middlewares/                        # Middlewares de validación y auth
│   ├── auth_middlewares.js                # Verificación de JWT y roles
│   ├── auth_validations.js                # Validaciones del login
│   ├── carrito_venta_validations.js       # Validaciones de ventas
│   ├── productos_validations.js           # Validaciones de productos
│   ├── usuarios_validations.js            # Validaciones de usuarios
│   ├── ventas_validations.js              # Validaciones de reportes ventas
│   └── utils.js                           # Helpers validación (express-validator)
│
├── 📁 prisma/                             # ORM de Prisma
│   ├── migrations/                        # Migraciones de BD
│   ├── schema.prisma                      # Esquema de base datos
│   └── prismaClient.js                    # Cliente Prisma singleton
│
├── 📁 public/                             # Archivos estáticos (no usado)
│   ├── index.html
│   └── stylesheets/
│
├── 📁 routes/                             # Definición de rutas API
│   ├── index.js                           # Ruta raíz
│   ├── auth_routes.js                     # POST /login
│   ├── carrito_venta_routes.js            # GET/POST carrito ventas
│   ├── categorias_routes.js               # GET categorías
│   ├── marcas_routes.js                   # GET marcas
│   ├── productos_routes.js                # CRUD de productos + CSV
│   ├── proveedores_routes.js              # GET proveedores
│   ├── roles_routes.js                    # GET roles
│   ├── unidades_routes.js                 # GET unidades
│   ├── usuarios_routes.js                 # CRUD de usuarios (admin)
│   ├── ventas_routes.js                   # GET ventas + stats
│   └── v1.js                              # Router principal v1 API
│
├── 📁 services/                           # Lógica negocio (acceso BD)
│   ├── carrito_venta_service.js           # Lógica ventas + actualización stock
│   ├── categorias_service.js              # Consulta categorías
│   ├── empleados_service.js               # Consulta empleados
│   ├── marcas_service.js                  # Consulta marcas
│   ├── productos_service.js               # CRUD productos + exportar CSV
│   ├── proveedores_service.js             # Consulta proveedores
│   ├── roles_service.js                   # Consulta roles
│   ├── unidades_service.js                # Consulta unidades
│   ├── usuarios_service.js                # CRUD usuarios completo
│   └── ventas_service.js                  # Consultas ventas + estadísticas
│
├── 📁 swagger/                            # Documentación API
│   ├── openapi.json                       # Especificación OpenAPI 3.0
│   └── swagger.js                         # Configuración Swagger UI
│
├── 📁 utils/                              # Utilidades generales
│   ├── ApiError.js                        # Clase errores + handlers
│   ├── ResponseHelper.js                  # Helpers respuestas HTTP
│   └── constants.js                       # Constantes (estados, roles, campos CSV)
│
├── 📄 .gitignore                          # Archivos ignorados por Git
├── 📄 app.js                              # Configuración Express
├── 📄 babel.config.js                     # Config Babel (tests)
├── 📄 eslint.config.js                    # Config ESLint
├── 📄 package-lock.json                   # Registro de versiones de dependencias del proyecto
└── 📄 package.json                        # Dependencias proyecto
```

### Frontend
- React : Biblioteca para construir interfaces de usuario basadas en componentes.
- Vite  : Herramienta de bundling y servidor de desarrollo ultrarrápido optimizado para proyectos modernos.
- Tailwindcss : Framework de CSS utilitario para crear interfaces responsivas y personalizables de forma ágil.

## Estructura de carpetas del frontend
```bash
frontend/
│
├── 📁 public/
│   └── favicon/                            # Recursos estáticos (favicon)
│
├── 📁 src/
│   │
│   ├── 📁 api/                             # Capa de comunicación con el backend
│   │   ├── 📁 actions/                     # Acciones de React Router (POST, PUT, DELETE)
│   │   │   ├── authActions.js              # Login y logout
│   │   │   ├── carritoVentaActions.js      # Creación de ventas
│   │   │   ├── productosActions.js         # CRUD de productos
│   │   │   └── usuariosActions.js          # CRUD de usuarios
│   │   │
│   │   ├── 📁 loaders/                     # Loaders de React Router (GET)
│   │   │   ├── authLoaders.js              # Verificación de autenticación
│   │   │   ├── carritoVentaLoaders.js      # Productos disponibles y ventas
│   │   │   ├── docLoader.js                # Documentación API
│   │   │   ├── layoutLoaders.js            # Datos del usuario logueado
│   │   │   ├── productosLoaders.js         # Listado y detalle de productos
│   │   │   ├── reportesLoaders.js          # Datos de ventas y reportes
│   │   │   └── usuariosLoaders.js          # Listado y detalle de usuarios
│   │   │
│   │   ├── 📁 services/                    # Servicios HTTP con Axios
│   │   │   ├── authService.js              # Autenticación
│   │   │   ├── carritoVentaService.js      # Gestión de ventas
│   │   │   ├── docService.js               # Documentación
│   │   │   ├── productoService.js          # CRUD productos + exportar CSV
│   │   │   ├── reporteService.js           # Reportes y estadísticas
│   │   │   └── usuarioService.js           # CRUD usuarios
│   │   │
│   │   ├── axiosConfig.js                  # Instancia de Axios + interceptores
│   │   ├── config.js                       # Variables de entorno
│   │   └── endpoints.js                    # URLs de la API REST
│   │
│   ├── 📁 assets/
│   │   └── 📁 icons/                       # Iconos SVG (Material Icons style)
│   │       ├── add.svg, edit.svg, etc.     # Iconos SVG reutilizables en componentes
│   │       └── logo.svg                    # Logo de Ferremax
│   │
│   ├── 📁 components/                      # Componentes reutilizables
│   │   ├── 📁 common/                      # Componentes compartidos
│   │   │   ├── 📁 Buttons/
│   │   │   │   ├── ActionButton.jsx        # Botón con variantes de color
│   │   │   │   └── ActionIconButton.jsx    # Botón solo icono
│   │   │   ├── AlertMessage.jsx            # Alertas (success, error, warning, info)
│   │   │   ├── Breadcrumbs.jsx             # Navegación de migas de pan
│   │   │   ├── ConfirmModal.jsx            # Modal de confirmación genérico
│   │   │   ├── DetailFieldTitle.jsx        # Campo de detalle (label + valor)
│   │   │   ├── SearchBar.jsx               # Buscador con debounce
│   │   │   └── StatusBadge.jsx             # Badge de estado (Activo/Inactivo)
│   │   │
│   │   ├── 📁 Forms/                       # Formularios complejos
│   │   │   ├── ProductForm.jsx             # Formulario de productos
│   │   │   └── UserForm.jsx                # Formulario de usuarios
│   │   │
│   │   └── 📁 layout/                      # Componentes de layout
│   │       ├── 📁 Footer/
│   │       │   └── Footer.jsx              # Pie de página
│   │       ├── 📁 Header/
│   │       │   └── Header.jsx              # Cabecera con logo y usuario
│   │       └── 📁 Navbar/
│   │           └── Navbar.jsx              # Menú de navegación principal
│   │
│   ├── 📁 contexts/                        # Contextos de React
│   │   ├── AuthContext.jsx                 # Contexto de autenticación (user, logout)
│   │   ├── CarritoContext.jsx              # Carrito de compras con localStorage
│   │   └── context.js                      # Context de React Router (userContext)
│   │
│   ├── 📁 helpers/                         # Funciones auxiliares
│   │   ├── authHelper.js                   # Verificación de roles
│   │   ├── carritoVentaHelper.js           # Formateo de fechas/horas
│   │   ├── pdfmakeFacturaHelper.js         # Generación de facturas PDF
│   │   ├── productsHelper.js               # Formateo, highlights, CSV
│   │   ├── usershelper.js                  # Filtrado de datos de usuarios
│   │   └── utils.js                        # Utilidades generales
│   │
│   ├── 📁 hooks/                           # Custom hooks
│   │   ├── useFormData.js                  # React Query para datos de formularios productos
│   │   └── useRolData.js                   # React Query para roles de usuario
│   │
│   ├── 📁 Middlewares/                     # Middlewares de React Router
│   │   └── authMiddleware.js               # Protección de rutas + verificación de roles
│   │
│   ├── 📁 pages/                           # Páginas de la aplicación
│   │   ├── 📁 Documentacion/
│   │   │   └── Documentacion.jsx           # Swagger UI embebido
│   │   │
│   │   ├── 📁 Error/
│   │   │   └── ErrorPage.jsx               # Página de error 404/403/500
│   │   │
│   │   ├── 📁 Home/
│   │   │   └── Home.jsx                    # Página de inicio
│   │   │
│   │   ├── 📁 Inventario/
│   │   │   ├── ProductoCrear.jsx           # Crear producto
│   │   │   ├── ProductoDetalle.jsx         # Ver detalle de producto
│   │   │   ├── ProductoEditar.jsx          # Editar producto
│   │   │   └── ProductosList.jsx           # Listado de productos con filtros
│   │   │
│   │   ├── 📁 Login/
│   │   │   └── Login.jsx                   # Página de login
│   │   │
│   │   ├── 📁 Reportes/
│   │   │   └── ReportesList.jsx            # Reportes de ventas + top productos
│   │   │
│   │   ├── 📁 Usuarios/
│   │   │   ├── UsuarioCrear.jsx            # Crear usuario
│   │   │   ├── UsuarioDetalle.jsx          # Ver detalle de usuario
│   │   │   ├── UsuarioEditar.jsx           # Editar usuario
│   │   │   └── UsuariosList.jsx            # Listado de usuarios
│   │   │
│   │   └── 📁 Ventas/
│   │       ├── ModalPago.jsx               # Modal de selección de forma de pago
│   │       ├── ModalVenta.jsx              # Modal de confirmación de venta
│   │       ├── VentasFactura.jsx           # Factura con generación PDF
│   │       └── VentasList.jsx              # Carrito de compras + listado productos
│   │
│   ├── 📁 schemas/                         # Esquemas de validación con Zod
│   │   ├── productoSchema.js               # Validación de productos (create/update)
│   │   └── usuarioSchema.js                # Validación de usuarios (create/update)
│   │
│   ├── Layout.jsx                          # Layout principal con AuthContext y Outlet
│   ├── main.jsx                            # Punto de entrada (React Query + Router)
│   ├── router.jsx                          # Configuración de rutas (React Router v7)
│   ├── index.css                           # Estilos globales + Tailwind
│   └── style.css                           # Importación de Tailwind
│
├── 📁 config/
│   └── logger.js                           # Logger con Pino
│
├── 📄 .gitignore                           # Archivos ignorados por Git
├── 📄 eslint.config.js                     # Configuración de ESLint
├── 📄 index.html                           # HTML principal
├── 📄 package-lock.json                    # Registro de versiones de dependencias del proyecto frontend
├── 📄 package.json                         # Dependencias y scripts
└── 📄 vite.config.js                       # Configuración de Vite + plugins
```

## 📋 Descripción de Componentes Clave
### 🔐 Autenticación y Seguridad

- authMiddleware.js: Protege rutas privadas y verifica roles (admin, encargado, vendedor)
- AuthContext.jsx: Provee datos del usuario y función de logout globalmente
- Login.jsx: Formulario de login con manejo de errores

### 🛒 Sistema de Ventas

- CarritoContext.jsx: Gestiona el carrito con persistencia en localStorage
- VentasList.jsx: Página principal de ventas (productos + carrito)
- ModalPago.jsx: Selección de forma de pago
- ModalVenta.jsx: Confirmación de venta exitosa
- VentasFactura.jsx: Visualización y descarga de factura en PDF (pdfmake)

### 📦 Gestión de Productos

- ProductForm.jsx: Formulario reutilizable para crear/editar productos
- ProductosList.jsx: Tabla con filtros, búsqueda, exportación CSV y highlights de stock
- ProductoDetalle.jsx: Vista detallada con acciones (editar, dar de baja)

### 👥 Gestión de Usuarios

- UserForm.jsx: Formulario para crear/editar usuarios
- UsuariosList.jsx: Tabla de usuarios con cambio de estado
- UsuarioDetalle.jsx: Vista detallada con acciones

### 📊 Reportes y Análisis

- ReportesList.jsx: Dashboard con filtros de fecha, forma de pago y top 3 productos

### 🎨 Componentes Reutilizables

- ActionButton.jsx: Botón con variantes (success, warning, danger, etc.)
- AlertMessage.jsx: Alertas con auto-cierre y animaciones
- ConfirmModal.jsx: Modal de confirmación genérico
- SearchBar.jsx: Buscador con integración a React Router
- StatusBadge.jsx: Badge visual para estados (Activo/Inactivo)

### 🔧 Helpers y Utilidades

- productsHelper.js: Formateo de fechas, precios, highlights de stock/vencimiento
- pdfmakeFacturaHelper.js: Genera definición de factura para pdfmake
- authHelper.js: Función requireRole() para proteger acciones por rol

### 🌐 Servicios API

Todos los servicios usan una instancia configurada de Axios con:

- Interceptor de request: Agrega token JWT automáticamente
- Interceptor de response: Redirige a login si el token expiró (401)

### 📝 Validación

Esquemas Zod en schemas/ para validación client-side antes de enviar al backend

### 📦 Dependencias Principales

- React 19 + React Router v7
- Tailwind CSS 4 + @tailwindcss/vite
- React Query (TanStack Query)
- Zod (validaciones)
- Axios (HTTP client)
- Pdfmake (generación de PDFs)
- Swagger UI React (documentación)
- Vite (build tool)

### 📦 Instalación de la app

### Prerrequisitos
- Node.js v14 o superior
- npm o yarn

### Backend
```bash
cd backend
npm install
npx prisma migrate dev
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```
### Variables de ambiente requeridas para backend

- DATABASE_URL: link de conexión local incluyendo en este datos como el usuario y contraseña del gestor local con formato protocolo://usuario:contraseña@host:puerto/nombre_base_de_datos, ej: mysql://root:admin123@localhost:3306/ferreteria_media_docena
- JWT_SECRET cadena de texto para firmar el token y verificar el token en las autenticaciones.
- NODE_ENV cadena de texto que representa el ambiente actual de desarrollo (desarrollo o producción) 

### Credenciales de Prueba: 

Usuarios: 
- Alberto Martínez (rol: Encargado): alberto@ferremax.com
- Lucía Fernández (rol: Admin): lucia@ferremax.com
- Carlos Rodríguez (rol: Vendedor): carlos@ferremax.com
- Carolina López (rol: Vendedor): carolina@ferremax.com

Contraseña: admin123

### Autores ✒️
- Cicchini, Josefina
- Cohen, Rosana
- Cruz Guantay, Francisco Agustin
