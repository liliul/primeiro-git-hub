// server.js
require('dotenv').config(); // Carrega as variáveis de ambiente

const express = require('express');
const jwt = require('jsonwebtoken');
const { expressjwt } = require('express-jwt');
const bcrypt = require('bcrypt');
const path = require('path');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cors = require('cors');
const app = express();
const port = 3000;

const db = require('./src/conexao');
const { router } = require('./src/utils/router');

app.use(express.json());

// app.use(helmet());
// app.use(cors());

app.use(express.static('public'));

// Chave secreta do JWT (deve ser mantida em segredo!)
const jwtSecret = process.env.JWT_SECRET || 'uma-chave-secreta-muito-forte';


// const loginLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 2,
//   message: { message: 'Muitas tentativas. Tente novamente em 15 minutos.' }
// });

app.use('/', router)

// teste do banco de dados
app.get("/", (req, res) => {
  db.query("SELECT * FROM usuario", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});
app.get("/get", (req, res) => {
  db.query("SELECT id, username, role FROM usuario", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

app.get("/git", async (req, res) => {
  const githubUser = await fetch('https://api.github.com/users/liliul')
  const data = await githubUser.json()

  res.json({message: data})
  
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
  db.query("SELECT * FROM usuario", async (err, results) => {
    if (err) return res.status(500).json(err);

      const { username, passworld } = req.body;

      if (!username || !passworld || undefined) return res.status(401).json({ message: 'Nome ou senha invalida' }) 

      console.log('p',passworld, username)
      
      const user = results.find(u => u.username === username);
      if (!user) {
        return res.status(401).json({ message: 'Credenciais inválidas' });
      }
      
      try {
        const compararPassworld = await bcrypt.compare(passworld, user.passworld)
        console.log('c',compararPassworld);

        if (!compararPassworld){
          return res.status(401).json({ massage: 'Senha invalida bcrypt' })
        }  
      
        const token = jwt.sign({ id: user.id, role: user.role }, jwtSecret, { expiresIn: '1h' });
        res.json({ token });

      } catch(err) {
        return res.status(500).json({ message: 'Erro na comparação bcrypt', err: err.message })
      }
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

app.patch('/newrole/:id', authMiddleware, adminMiddleware, (req, res) => {
  const { id } = req.params
  const { role } = req.body
  console.log('id', id);
  
  const virifiRoles = ['admin','user']
  if(!virifiRoles.includes(role))    {
    return res.status(401).json({ message: 'Nome da role errado. correto ex: admin ou user' })
  }

  if (!id || !role) res.status(400).json({ message: "Erro role vazio"})
  
  db.query("UPDATE usuario SET role = ? WHERE id = ?", [role, id], (err, result) => {
    if (err) return res.status(500).json({ message: "Erro ao alterar role." })

    
    console.log('patch');
    

    res.json({ message: "Roles Alterada com sucesso!",})
  })
})

app.put('/updateuser/:id', authMiddleware, adminMiddleware, (req, res) => {
  const { id } = req.params
  const { username } = req.body

  db.query("UPDATE usuario SET username = ? WHERE id = ?", [username, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message })

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Usuario nao encontrado" })
    }

    res.json({ message: "Usuario atualizado como sucesso!"})
  })

})

app.delete('/deleteuser/:id', authMiddleware, adminMiddleware, (req, res) => {
  const { id } = req.params
  
  db.query("DELETE FROM usuario WHERE id = ?",[id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message })

    res.json({ message: `Usuario deletado com sucesso.` })
  })
})

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});