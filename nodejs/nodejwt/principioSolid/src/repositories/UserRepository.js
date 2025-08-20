class UserRepository {
  constructor(db) {
    this.db = db; // Injeta a conexão com o banco de dados
  }

  /**
   * Busca todos os usuários no banco de dados.
   * @returns {Promise<Array>} Uma Promise que resolve com um array de usuários.
   */
  async getAllUsers() {
    return new Promise((resolve, reject) => {
      this.db.query("SELECT id, username, role FROM usuario", (err, results) => {
        if (err) {
          console.error("Erro no UserRepository.getAllUsers:", err);
          return reject(new Error('Erro ao buscar usuários no banco de dados.'));
        }
        resolve(results);
      });
    });
  }

  /**
   * Busca um usuário pelo nome de usuário.
   * @param {string} username - O nome de usuário a ser buscado.
   * @returns {Promise<Object|null>} Uma Promise que resolve com o objeto do usuário ou null se não encontrado.
   */
  async getUserByUsername(username) {
    return new Promise((resolve, reject) => {
      this.db.query("SELECT id, username, password, role FROM usuario WHERE username = ?", [username], (err, results) => {
        if (err) {
          console.error("Erro no UserRepository.getUserByUsername:", err);
          return reject(new Error('Erro ao buscar usuário pelo nome no banco de dados.'));
        }
        // Retorna o primeiro resultado ou null se não houver
        resolve(results[0] || null);
      });
    });
  }

  /**
   * Cria um novo usuário no banco de dados.
   * @param {Object} userData - Dados do usuário (username, hashedPassword, role).
   * @returns {Promise<Object>} Uma Promise que resolve com o ID do usuário inserido.
   */
  async createUser({ username, hashedPassword, role }) {
    return new Promise((resolve, reject) => {
      // 'data_registro' e 'ultima_atualizacao' são esperados para serem definidos por DEFAULT CURRENT_TIMESTAMP no MySQL
      this.db.query("INSERT INTO usuario (username, password, role) VALUES (?, ?, ?)",
        [username, hashedPassword, role],
        (err, result) => {
          if (err) {
            console.error("Erro no UserRepository.createUser:", err);
            if (err.code === 'ER_DUP_ENTRY') {
              return reject(new Error('Nome de usuário já existe.'));
            }
            return reject(new Error('Erro ao criar usuário no banco de dados.'));
          }
          resolve({ userId: result.insertId });
        });
    });
  }

  /**
   * Atualiza um usuário existente.
   * @param {number} userId - ID do usuário a ser atualizado.
   * @param {Object} updateData - Dados para atualização (username, hashedPassword, role).
   * @returns {Promise<boolean>} Uma Promise que resolve para true se o usuário foi atualizado, false caso contrário.
   */
  async updateUser(userId, updateData) {
    return new Promise((resolve, reject) => {
      const fields = [];
      const values = [];

      for (const key in updateData) {
        fields.push(`${key} = ?`);
        values.push(updateData[key]);
      }

      if (fields.length === 0) {
        return resolve(false); // Nenhum dado para atualizar
      }

      values.push(userId);
      this.db.query(`UPDATE usuario SET ${fields.join(', ')} WHERE id = ?`, values, (err, result) => {
        if (err) {
          console.error("Erro no UserRepository.updateUser:", err);
          if (err.code === 'ER_DUP_ENTRY') {
            return reject(new Error('Nome de usuário já existe.'));
          }
          return reject(new Error('Erro ao atualizar usuário no banco de dados.'));
        }
        resolve(result.affectedRows > 0);
      });
    });
  }

  /**
   * Deleta um usuário pelo ID.
   * @param {number} userId - ID do usuário a ser deletado.
   * @returns {Promise<boolean>} Uma Promise que resolve para true se o usuário foi deletado, false caso contrário.
   */
  async deleteUser(userId) {
    return new Promise((resolve, reject) => {
      this.db.query("DELETE FROM usuario WHERE id = ?", [userId], (err, result) => {
        if (err) {
          console.error("Erro no UserRepository.deleteUser:", err);
          return reject(new Error('Erro ao deletar usuário no banco de dados.'));
        }
        resolve(result.affectedRows > 0);
      });
    });
  }
}

module.exports = UserRepository;