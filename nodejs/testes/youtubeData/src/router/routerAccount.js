import express from 'express'
import bcrypt from 'bcrypt'
import db from '../db/conection_db.js'

const routerAccount = express.Router()

routerAccount.post('/account', async (req, res) => {
  const { name, email, password } = req.body
  const role = 'user'

  try {
    const hashPassword = await bcrypt.hash(password, 10)

    const result = await db.query(
      `INSERT INTO usuarios (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *`,
      [name, email, hashPassword, role] 
    );

    res.send({ message : 'Usuario criado com sucesso!', db: result.rows[0] })

  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao conectar com o banco');
  }
});

routerAccount.get('/account', async (req, res) => {
  try {

    const result = await db.query(`
      SELECT id, name, email, role, criado_em FROM usuarios;
    `);

    res.send({ message : result.rows})

  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao conectar com o banco');
  }
});

routerAccount.delete('/account/:id', async (req, res) => {
  const { id } = req.params

  const idNumber = Number(id) ? id : res.status(404).send({ message: 'id nao um numero' }); 
    
  try {

    const result = await db.query(`DELETE FROM usuarios WHERE id = $1 RETURNING *;`, [idNumber]);

    if (result.rowCount === 0) {
      return res.status(404).send({ message: 'Usuário não encontrado' });
    }

    res.send({ message : result.rows[0]})

  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao conectar com o banco');
  }
});

routerAccount.patch('/account/:id', async (req, res) => {
  const { id } = req.params;
  const fields = req.body;
  
  if (Object.keys(fields).length === 0) {
    return res.status(400).send({ message: 'Nenhum campo enviado para atualização.' });
  }

  const setClauses = [];
  const values = [];
  let index = 1;

  for (const key in fields) {
    setClauses.push(`${key} = $${index}`);
    values.push(fields[key]);
    index++;
  }
  
  values.push(id);

  const query = `
    UPDATE usuarios
    SET ${setClauses.join(', ')}
    WHERE id = $${index}
    RETURNING *
  `;
  
  try {
    const result = await db.query(query, values);

    if (result.rowCount === 0) {
      return res.status(404).send({ message: 'Usuário não encontrado.' });
    }

    res.send({ message: 'Usuário atualizado com sucesso.', user: result.rows[0] });

  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Erro ao atualizar usuário.' });
  }
});

routerAccount.put('/account/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;


  try {
    const result = await db.query(`UPDATE usuarios SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING *;`, [name, email, password, id]);

    if (result.rowCount === 0) {
      return res.status(404).send({ message: 'Usuário não encontrado.' });
    }

    res.send({ message: 'Usuário atualizado com sucesso.', user: result.rows[0] });

  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Erro ao atualizar usuário.' });
  }
});


export default routerAccount