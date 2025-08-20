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