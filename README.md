<h1 align="center">
   Futebol Score-API
</h1>

<p align="center">
 <a href="#-sobre-o-projeto">Sobre</a> •
 <a href="#-como-executar-o-projeto">Como executar</a> • 
 <a href="#-tecnologias">Tecnologias</a> • 
</p>


## 💻 Sobre o projeto

Nesse projeto o objetivo foi desenvolver um CRUD (Create, Read, Update e Delete) para montar uma API, de um banco de dados para um site informativo sobre partidas e classificações de futebol, que é consumida por um front-end (disponibilizado pela trybe)
 🚀

## 🚀 Como executar o projeto

Clonar o repositório

Executar o comando npm install

Criar um arquivo .env na raiz do projeto(passar as variaveis de ambiente especificadas em .env.example)

Executar o comando npm start ou npm run debug

A aplicação será aberta na porta:3000 - acesse http://localhost:3000


## 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

-   **[Express](https://github.com/expressjs/express)**
-   **[MySQL](https://github.com/mysql)**
-   **[Sequelize](https://github.com/sequelize/sequelize)**
-   **[JSON-WebToken](https://github.com/auth0/node-jsonwebtoken)**
-   **[Nodemon](https://github.com/remy/nodemon)**

---

## Endpoint para o login de pessoas usuárias

- O endpoint acessível através do caminho POST(`/login`).

- A rota deve receber os campos `username` e `password`.

- O endpoint recebe a estrutura abaixo e retorna como resposta um token:
```json
  {
    "email": "string",
    "password": "string"
  }
```

---

## O endpoint adiciona um novo user a sua tabela no banco de dados;

- O endpoint acessível através do caminho POST(`/user`);
- 
- O endpoint recebe a estrutura abaixo e retorna como resposta um token:
```json
   {
     "displayName": "string",
     "email": "string",
     "password": "string",,
     "image": "string",
   }
```

---

## Todos os EndPoins abaixo necessitam do Token na requisição

---

## O endpoint traz todos users do banco de dados;

- O endpoint acessível através do caminho GET(`/user`);

Retorna todos os usuarios cadastrados

---

## O endpoint traz o user baseado no id do banco de dados se ele existir

- O endpoint acessível através do caminho GET(`/user/:id`);

Retorna o usuario com o id passado.

---

## O endpoint é capaz de deletar você do banco de dados, baseado no id que esta dentro do seu token;

- O endpoint deve ser acessível através do caminho DELETE(`/user/:me`);

---

## O endpoint adiciona uma nova categoria a sua tabela no banco de dados

- O endpoint acessível através do caminho POST(`/categories`);

- O endpoint deve receber a seguinte estrutura:
```json
{
  "name": "Typescript"
}
```
---
## Endpoint para listar todos as categorias

- O endpoint acessível através do caminho GET(`/categories`).

- O endpoint traz todas categorias do banco de dados;
---

## O endpoint é capaz de adicionar um novo blog post e vinculá-lo as categorias em suas tabelas no banco de dados;

- O endpoint deve ser acessível através do caminho POST(`/post`);

- O endpoint deve receber a seguinte estrutura:
```json
   {
     "title": "string",
     "content": "string",
     "categoryIds": array(Contendo os Ids das categorias)
   }
   ```
---
## Endpoint para listar todos as categorias

- O endpoint acessível através do caminho GET(`/post`).

- Exemplo de retorno:

```json
[
  {
    "id": 1,
    "title": "Post do Ano",
    "content": "Melhor post do ano",
    "userId": 1,
    "published": "2011-08-01T19:58:00.000Z",
    "updated": "2011-08-01T19:58:51.000Z",
    "user": {
      "id": 1,
      "displayName": "Lewis Hamilton",
      "email": "lewishamilton@gmail.com",
      "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
    },
    "categories": [
      {
        "id": 1,
        "name": "Inovação"
      }
    ]
  },
  
  /* ... */
]
```
---

## O endpoint traz o blog post baseado no id do banco de dados se ele existir;

- O endpoint deve ser acessível através do caminho GET(`/post/:id`);

---

## O endpoint é capaz de alterar um post do banco de dados, se ele existir;

- O endpoint deve ser acessível através do caminho POST(`/post/:id`);

- O endpoint deve receber a seguinte estrutura:
```json
   {
     "title": "string",
     "content": "string"
   }
   ```
---

## O endpoint é capaz de deletar um blog post baseado no id do banco de dados se ele existir;

- O endpoint deve ser acessível através do caminho DELETE(`/post/:id`);

---





