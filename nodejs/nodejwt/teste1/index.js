// server.js
require('dotenv').config(); // Carrega as variáveis de ambiente

const express = require('express');
const jwt = require('jsonwebtoken');
const { expressjwt } = require('express-jwt');
const bcrypt = require('bcrypt');
const app = express();
const port = 3000;

const db = require('./src/conexao');

app.use(express.json());
app.use(express.static("public"));

// Chave secreta do JWT (deve ser mantida em segredo!)
const jwtSecret = process.env.JWT_SECRET || 'uma-chave-secreta-muito-forte';


// teste do banco de dados
app.get("/", (req, res) => {
  db.query("SELECT * FROM usuario", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});


// registro
app.post('/cadastrar', async (req, res) => {
  const { username, passworld, role, date } = req.body
  const hashPassworld = await bcrypt.hash(passworld, 10)
  console.log(username, hashPassworld, role, date);
  
  db.query("INSERT INTO usuario (username, passworld, role, date) VALUES (?, ?, ?, ?)", [username, hashPassworld, role, date], (err, result) => {
    if (err) return res.status(401).json({ message: 'Erro na cadastro.', error: err.message })
      
    res.json({ message: 'Cadastro com sucesso!' })
  })
})

app.post('/login', (req, res) => {
  db.query("SELECT * FROM usuario", (err, results) => {
    if (err) return res.status(500).json(err);

      const { username } = req.body;
   

      const user = results.find(u => u.username === username);
        console.log(user);
        
      if (!user) {
        return res.status(401).json({ message: 'Credenciais inválidas' });
      }

      // Gera o token JWT com o ID e o papel do usuário
      const token = jwt.sign({ id: user.id, role: user.role }, jwtSecret, { expiresIn: '1h' });

      res.json({ token });
  });

});

// --- Middleware de Autenticação (verifica o token) ---
const authMiddleware = expressjwt({
  secret: jwtSecret,
  algorithms: ['HS256']
});

// --- Middleware de Autorização (verifica o papel) ---
const adminMiddleware = (req, res, next) => {
  // express-jwt já adicionou o 'auth' no objeto de requisição
  // O 'auth' contém o payload do token
  if (req.auth && req.auth.role === 'admin') {
    next(); // Permite o acesso
  } else {
    res.status(403).json({ message: 'Acesso negado. Requer permissão de admin.' });
  }
};

// --- Rotas Protegidas ---
// Rota para usuários autenticados
app.get('/profile', authMiddleware, (req, res) => {
  // A requisição só chega aqui se o token for válido
  console.log(req.auth.id);

  res.json({ message: `Bem-vindo, usuário ${req.auth.id}` });
});

// Rota protegida apenas para admins
app.get('/admin', authMiddleware, adminMiddleware, (req, res) => {
  // A requisição só chega aqui se o usuário for autenticado e admin
  res.json({ message: `Você está na área de admin. ${req.auth.id}` });
});

// testando 
app.get('/nokia', authMiddleware, adminMiddleware, (req, res) => {
  // A requisição só chega aqui se o usuário for autenticado e admin
  console.log(req.body);
  
  res.json({ message: 'Site da Nokia Smartphones.' });
});

app.post('/criarusuariologin/', authMiddleware, adminMiddleware, (req, res) => {
  const {username, role } = req.body
  console.log(username, role);

  if (!username || !role) res.status(400).json({ message: "Erro username e role vazio"})
  
  db.query("INSERT INTO usuario (username, role) VALUES (?, ?)", [username, role], (err, result) => {
    if (err) return res.status(500).json({ message: "Erro ao adicionar usuario." })

    res.json({ message: "Usuario adiconado com sucesso!", userId: result.insertId })
  })
})

app.put('/login/:id', authMiddleware, adminMiddleware, (req, res) => {
  const { id } = req.params
  const { username, role } = req.body

  db.query("UPDATE usuario SET username = ?, role = ? WHERE id = ?", [username, role, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message })

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Usuario nao encontrado" })
    }

    res.json({ message: "Usuario atualizado como sucesso!"})
  })

})

app.delete('/login/:id', authMiddleware, adminMiddleware, (req, res) => {
  const { id } = req.params
  
  db.query("DELETE FROM usuario WHERE id = ?",[id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message })

    res.json({ message: `Usuario deletado com sucesso.` })
  })
})

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});