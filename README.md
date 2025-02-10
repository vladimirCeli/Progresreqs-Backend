# Progresreqs-Backend

**Versión:** 1.0.0  
**Autor:** Vladimir Celi  
**Descripción:** Primer prototipo de una aplicación backend con Express, MongoDB y PostgreSQL.

---

## 🚀 Tecnologías Utilizadas

- **Node.js** (Runtime de JavaScript)
- **Express** (Framework para el backend)
- **MongoDB** (Base de datos NoSQL)
- **PostgreSQL** (Base de datos relacional)
- **Sequelize** (ORM para PostgreSQL)
- **Mongoose** (ODM para MongoDB)
- **Redis** (Para almacenamiento en caché)
- **JWT** (Autenticación basada en tokens)
- **bcrypt** (Hashing de contraseñas)
- **Nodemailer** (Envío de correos electrónicos)
- **Node-cron** (Ejecutar tareas programadas)
- **Dotenv** (Manejo de variables de entorno)
- **Morgan** (Registro de peticiones HTTP)
- **CORS** (Manejo de seguridad en peticiones)
- **Express-rate-limit** (Protección contra ataques de fuerza bruta)

---

## 📦 Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/vladimirCeli/Progresreqs-Backend.git
   cd Progresreqs-Backend
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

---

## 🔧 Configuración

1. Crea un archivo **`.env`** en la raíz del proyecto y configura tus variables de entorno:
   ```env
   ACCESS_TOKEN_SECRET=tu_secret_key
   DB_DIALECT=postgres
   DB_HOST=tu_host
   DB_NAME=tu_base_de_datos
   DB_USER=tu_usuario
   DB_PASSWORD=tu_contraseña
   DB_PORT=5432
   LINKMONGO=mongodb+srv://tu_conexion
   REFRESH_TOKEN_SECRET=tu_refresh_token_secret
   ```

2. **Configuración de la base de datos:**
   - Asegúrate de tener PostgreSQL y MongoDB en ejecución.
   - Si usas Docker, puedes iniciar PostgreSQL y Redis con:
     ```bash
     docker-compose up -d
     ```

---

## 🚀 Uso

### **Modo desarrollo**
```bash
npm run dev
```
Esto iniciará el servidor con **nodemon** para recargar automáticamente los cambios.

### **Modo producción**
```bash
npm start
```
Esto iniciará el servidor en modo normal sin monitoreo de cambios.

---

## 📂 Estructura del Proyecto
```
ssunl/
│── src/
│   ├── config/      # Configuración (Base de datos, variables de entorno)
│   ├── controllers/ # Lógica de negocio
│   ├── models/      # Modelos de datos (Mongoose, Sequelize)
│   ├── routes/      # Rutas de la API
│   ├── middlewares/ # Middlewares (Autenticación, validaciones)
│   ├── utils/       # Utilidades y helpers
│   ├── index.js     # Punto de entrada de la aplicación
│── .env             # Variables de entorno
│── package.json     # Dependencias y scripts
│── README.md        # Documentación del proyecto
```

---

## 📌 Endpoints Principales

| Método | Ruta               | Descripción |
|---------|--------------------|-------------|
| `POST`  | `/auth/login`      | Iniciar sesión y obtener un token |
| `POST`  | `/auth/register`   | Registrar un nuevo usuario |
| `GET`   | `/users`           | Obtener lista de usuarios |
| `POST`  | `/questionnaire`   | Crear un cuestionario |
| `GET`   | `/categories`      | Obtener categorías |

---

## 🛠 Herramientas Recomendadas

- **Postman**: Para probar la API.
- **MongoDB Compass**: Para administrar la base de datos MongoDB.
- **pgAdmin**: Para administrar PostgreSQL.

---

## ⚡ Contribuir

1. Haz un fork del repositorio.
2. Crea una rama con tu nueva funcionalidad:
   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```
3. Realiza cambios y confirma los cambios:
   ```bash
   git commit -m "Agrega nueva funcionalidad"
   ```
4. Sube los cambios a tu repositorio:
   ```bash
   git push origin feature/nueva-funcionalidad
   ```
5. Crea un **Pull Request** en GitHub.

---

## 📜 Licencia

Este proyecto está bajo la licencia **ISC**.

---

## 📞 Contacto

Si tienes dudas o sugerencias, contacta a **Vladimir Celi** en [vladiceli^@gmail.com].

