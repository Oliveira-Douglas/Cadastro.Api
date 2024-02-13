const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware para analisar corpos de requisição JSON
app.use(bodyParser.json());

let users = [];

// Endpoint para listar todos os usuários
app.get("/api/users", (req, res) => {
  res.json(users);
});

// Endpoint para obter um usuário por ID
app.get("/api/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find((user) => user.id === userId);
  if (!user) {
    res.status(404).json({ message: "Usuário não encontrado" });
  } else {
    res.json(user);
  }
});

// Endpoint para criar um novo usuário
app.post("/api/users", (req, res) => {
  const newUser = req.body;
  newUser.id = users.length + 1;
  users.push(newUser);
  res.status(201).json(newUser);
});

// Endpoint para atualizar um usuário existente
app.put("/api/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const updateUser = req.body;
  const index = users.findIndex((user) => user.id === userId);
  if (index === -1) {
    res.status(404).json({ message: "Usuário não encontrado" });
  } else {
    users[index] = { ...users[index], ...updateUser };
    res.json(users[index]);
  }
});

// Endpoint para excluir um usuário
app.delete("/api/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const index = users.findIndex((user) => user.id === userId);
  if (index === -1) {
    res.status(404).json({ message: "Usuário não encontrado" });
  } else {
    const deletedUser = users.splice(index, 1);
    res.json(deletedUser[0]);
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
