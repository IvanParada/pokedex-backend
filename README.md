<p align="center">
  <a href="http://nestjs.com/" target="_blank">
    <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="NestJS Logo" />
  </a>
</p>

<h1 align="center">Pokédex API - NestJS & MongoDB</h1>

<p align="center">
  API REST desarrollada con <strong>NestJS</strong> conectada a <strong>MongoDB</strong>, utilizando <strong>Docker</strong> y <strong>Docker Compose</strong>.
</p>

---

## 📖 Descripción

Este proyecto es una API REST cuyo objetivo principal es **aprender y aplicar conceptos fundamentales de NestJS**, tales como:

- Arquitectura modular
- CRUDs básicos
- Conexión a MongoDB
- Uso de Docker para entornos de desarrollo
- Validaciones y pipes personalizados

La API expone endpoints para gestionar Pokémones, permitiendo búsquedas flexibles y validaciones personalizadas.

---

## 🧠 ¿Qué aprendí?

Durante el desarrollo de este proyecto puse en práctica y reforcé los siguientes conceptos:

- Uso de **NestJS CLI**
- Conexión a **MongoDB** usando Mongoose
- Creación de **CRUDs**
- Búsqueda por múltiples criterios:
  - Nombre del Pokémon
  - MongoID
  - Número (`no`)
- Implementación de **Custom Pipes** para validaciones
- Uso de **Docker** y **Docker Compose** para levantar la base de datos
- Manejo de variables de entorno
- Implementación de **Seed** para poblar la base de datos automáticamente
- Uso de **DTOs para Query Params** con validaciones y transformaciones


---

## 🛠️ Stack Tecnológico

- **Backend:** NestJS
- **Base de datos:** MongoDB
- **Contenedores:** Docker & Docker Compose
- **Lenguaje:** TypeScript
- **Gestor de paquetes:** Yarn

---

## 🚀 Ejecutar el proyecto en desarrollo

### 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/IvanParada/pokedex-backend.git
cd ./pokedex-backend
```

### 2️⃣ Instalar dependencias
```
yarn install
```
### 3️⃣ Instalar NestJS CLI (si no lo tienes)
```
npm i -g @nestjs/cli
```

### 4️⃣ Levantar la base de datos (MongoDB)
```
docker-compose up -d
```

### 5️⃣ Levantar el proyecto
```
yarn start:dev
```
### 6️⃣ Reconstruir la base de datos con la semilla
```
http://localhost:3000/api/seed
```



## Endpoints 

<details>
<summary><strong>Pokemon Resource</strong></summary>

* Get All Pokemons (GET)
```
http://localhost:3000/api/pokemon?limit=20&offset=0
```

* Get Pokemon By term ```( id, name, no )```  (GET)
```
http://localhost:3000/api/pokemon/:term
```

* Create Pokemon (POST)
```
http://localhost:3000/api/pokemon
```
  Body:
  ```json
{
	"name": "Onix",
    "no": 5
}
  ```

* Update Pokemon (PATCH)

```
http://localhost:3000/api/pokemon/:id
```
  Body:

```json
{
	"name": "pikachu",
    "no": 100
}
```

* Delete Pokemon (DELETE)
```
http://localhost:3000/api/pokemon/:id
```
</details>
