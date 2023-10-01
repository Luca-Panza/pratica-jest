# <p align = "center">Jest Exercise</p>

<p align="center">
   <img width=176px; src="https://cdn-icons-png.flaticon.com/512/3194/3194591.png"/>
</p>

<p align = "center">
   <img src="https://img.shields.io/badge/authors-_Jefti_Meira_&_Luca_Panza_-4dae71?style=flat-square" />
   <img src="https://img.shields.io/github/languages/count/jefti/pratica-jest?color=4dae71&style=flat-square" />
</p>


##  :clipboard: Description

This project is a basic back-end project, primarily created for practicing the use of Jest. This API is built using the Express framework in Node.js, with TypeScript and Prisma for database operations. The API enables users to create a fruit, find a specific fruit, and list all fruits.
***

## :computer:	 Technologies and Concepts

- REST APIs
- JavaScript
- Node.js
- Express.js
- Prisma
- Typescript
- Postgres SQL
- Jest 

***

## :rocket: Endpoints

```yml
GET /fruits
    - Endpoint to get all fruits
    - headers: {}
    - body:{}
```
    
```yml 
GET /fruits/:id
    - Endpoint to get specifc a fruit 
    - params: {
      "id": number
      } 
    - headers: {}
    - body: {}
```
    
```yml 
POST /fruits 
    - Endpoint to list all the books
    - headers: {}
    - body: {
      "name": "Apple",
      "price": number
    }
```

## 🏁 Running the application

Make sure you have the latest stable version of [Node.js](https://nodejs.org/en/download/), [npm](https://www.npmjs.com/) and [postgresql](https://www.postgresql.org/) running locally.

First, clone this repository on your machine:

```

git clone https://github.com/jefti/pratica-jest

```

Then, navigate to the project folder and install the dependencies with the following command:

```

npm install

```

In the terminal, run the Prisma commands to create the PostgreSQL database on your machine.

```

npx prisma generate && npx prisma migrate dev

```

After that run the following command to see the tests working.

```

npm run test

```


Once the process is finished, just start the server.

```

npm start

```

Or to test on a production server.

```

npm run dev

```

