const UserRepository = require('../repositories/UserRepository');
const AuthService = require('../services/AuthService');

class UserController {
  constructor(db) {
    this.userRepository = new UserRepository(db); // Injeta o repositório
  }

  /**
   * Obtém todos os usuários.
   * @param {Object} req - Objeto de requisição do Express.
   * @param {Object} res - Objeto de resposta do Express.
   */
  async getAllUsers(req, res) {
    try {
      const users = await this.userRepository.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      console.error('Erro no UserController.getAllUsers:', error.message);
      res.status(500).json({ message: 'Erro interno do servidor ao buscar usuários.' });
    }
  }

  /**
   * Cadastra um novo usuário.
   * @param {Object} req - Objeto de requisição do Express.
   * @param {Object} res - Objeto de resposta do Express.
   */
  async registerUser(req, res) {
    const { username, password, role } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Nome de usuário e senha são obrigatórios.' });
    }

    try {
      const hashedPassword = await AuthService.hashPassword(password);
      const newUser = await this.userRepository.createUser({ username, hashedPassword, role: role || 'user' });
      res.status(201).json({ message: 'Usuário cadastrado com sucesso!', userId: newUser.userId });
    } catch (error) {
      console.error('Erro no UserController.registerUser:', error.message);
      if (error.message.includes('Nome de usuário já existe')) {
        return res.status(409).json({ message: error.message });
      }
      res.status(500).json({ message: 'Erro interno do servidor ao cadastrar usuário.' });
    }
  }

  /**
   * Autentica um usuário e gera um JWT.
   * @param {Object} req - Objeto de requisição do Express.
   * @param {Object} res - Objeto de resposta do Express.
   */
  async loginUser(req, res) {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Nome de usuário e senha são obrigatórios.' });
    }

    try {
      const user = await this.userRepository.getUserByUsername(username);

      if (!user) {
        return res.status(401).json({ message: 'Credenciais inválidas.' });
      }

      const passwordMatch = await AuthService.comparePassword(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ message: 'Credenciais inválidas.' });
      }

      const token = AuthService.generateToken({ id: user.id, role: user.role });
      res.status(200).json({ token });
    } catch (error) {
      console.error('Erro no UserController.loginUser:', error.message);
      res.status(500).json({ message: 'Erro interno do servidor ao tentar fazer login.' });
    }
  }

  /**
   * Rota protegida de perfil.
   * @param {Object} req - Objeto de requisição do Express.
   * @param {Object} res - Objeto de resposta do Express.
   */
  getProfile(req, res) {
    // req.auth é preenchido pelo authenticateToken middleware
    res.status(200).json({ message: `Bem-vindo, usuário ${req.auth.id}, você tem a role de: ${req.auth.role}` });
  }

  /**
   * Rota protegida para admin.
   * @param {Object} req - Objeto de requisição do Express.
   * @param {Object} res - Objeto de resposta do Express.
   */
  getAdminPage(req, res) {
    res.status(200).json({ message: `Você está na área de admin. ID: ${req.auth.id}` });
  }

  /**
   * Outra rota protegida para admin.
   * @param {Object} req - Objeto de requisição do Express.
   * @param {Object} res - Objeto de resposta do Express.
   */
  getNokiaPage(req, res) {
    res.status(200).json({ message: 'Site da Nokia Smartphones. (Rota para Admin)' });
  }

  /**
   * Cria um novo usuário por um admin.
   * @param {Object} req - Objeto de requisição do Express.
   * @param {Object} res - Objeto de resposta do Express.
   */
  async createUserByAdmin(req, res) {
    const { username, password, role } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Nome de usuário e senha são obrigatórios para criar um novo usuário." });
    }

    try {
      const hashedPassword = await AuthService.hashPassword(password);
      const newUser = await this.userRepository.createUser({ username, hashedPassword, role: role || 'user' });
      res.status(201).json({ message: "Usuário adicionado com sucesso!", userId: newUser.userId });
    } catch (error) {
      console.error('Erro no UserController.createUserByAdmin:', error.message);
      if (error.message.includes('Nome de usuário já existe')) {
        return res.status(409).json({ message: error.message });
      }
      res.status(500).json({ message: 'Erro interno do servidor ao adicionar usuário por admin.' });
    }
  }

  /**
   * Atualiza um usuário por um admin.
   * @param {Object} req - Objeto de requisição do Express.
   * @param {Object} res - Objeto de resposta do Express.
   */

  async updateUserByAdmin(req, res) {
    const { id } = req.params;
    const { username, password, role } = req.body;

    const updateData = {};
    if (username) updateData.username = username;
    if (role) updateData.role = role;
    if (password) {
      try {
        updateData.password = await AuthService.hashPassword(password);
      } catch (hashError) {
        console.error("Erro ao gerar hash da senha na atualização (admin):", hashError.message);
        return res.status(500).json({ message: 'Erro interno do servidor ao processar nova senha.' });
      }
    }

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: 'Nenhum campo para atualizar fornecido.' });
    }

    try {
      const updated = await this.userRepository.updateUser(id, updateData);
      if (!updated) {
        return res.status(404).json({ message: "Usuário não encontrado." });
      }
      res.status(200).json({ message: "Usuário atualizado com sucesso!" });
    } catch (error) {
      console.error('Erro no UserController.updateUserByAdmin:', error.message);
      if (error.message.includes('Nome de usuário já existe')) {
        return res.status(409).json({ message: error.message });
      }
      res.status(500).json({ message: 'Erro interno do servidor ao atualizar usuário.' });
    }
  }

  /**
   * Deleta um usuário por um admin.
   * @param {Object} req - Objeto de requisição do Express.
   * @param {Object} res - Objeto de resposta do Express.
   */
  
  async deleteUserByAdmin(req, res) {
    const { id } = req.params;

    try {
      const deleted = await this.userRepository.deleteUser(id);
      if (!deleted) {
        return res.status(404).json({ message: "Usuário não encontrado." });
      }
      res.status(200).json({ message: `Usuário deletado com sucesso.` });
    } catch (error) {
      console.error('Erro no UserController.deleteUserByAdmin:', error.message);
      res.status(500).json({ message: 'Erro interno do servidor ao deletar usuário.' });
    }
  }
}

module.exports = UserController;
