import express from 'express'
import db from '../db/indexDB.js'
import AuthorizationJwt from '../middleware/auth.js'
import { authRoles } from '../middleware/roles.js'

const routeCarts = express.Router()

/**
 * @swagger
 * /create-carts-users/{id}:
 *   post:
 *     tags:
 *       - Carts
 *     summary: Cria ou atualiza o carrinho do usuário
 *     description: >
 *       Cria um carrinho para o usuário caso não exista e adiciona um produto ao carrinho.
 *       Se o produto já existir no carrinho, a quantidade será somada.
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário (UUID)
 *         schema:
 *           type: string
 *           format: uuid
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - quantity
 *             properties:
 *               productId:
 *                 type: string
 *                 format: uuid
 *                 example: "7f26f090-e1fb-4a83-a228-a36a3b7d88f0"
 *               quantity:
 *                 type: integer
 *                 minimum: 1
 *                 example: 2
 *
 *     responses:
 *       200:
 *         description: Produto adicionado ao carrinho
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Create carts ok"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/CartItem'
 *
 *       400:
 *         description: Erro de estoque ou validação
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorMessage'
 *
 *       404:
 *         description: Produto não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorMessage'
 */

routeCarts.post('/create-carts-users/:id', AuthorizationJwt, async (req, res) => {
    const { id } = req.params
    const { productId, quantity } = req.body;
    
    let carts = await db.query("SELECT * FROM carts WHERE user_id = $1 limit 1", [id]);
    
    if (carts.rows.length === 0) {
        carts = await db.query(`
        INSERT INTO carts (user_id) 
        VALUES ($1) returning *;
        `, [id])

    }

    const cartsId = carts.rows[0].id
    
    const product = await db.query("SELECT stock FROM products WHERE id = $1", [productId]);
    // console.log(product.rows[0].stock);
    if (product.rows.length === 0) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }
    if (product.rows[0].stock < quantity || quantity <= 0) {
      return res.status(400).json({ error: "Estoque insuficiente" });
    }
    
    const cartItem = await db.query(
        "SELECT quantity FROM cart_items WHERE cart_id = $1 AND product_id = $2",
        [cartsId, productId]
    );
    const currentQuantity = cartItem.rows.length > 0 ? cartItem.rows[0].quantity : 0;

    const newTotal = currentQuantity + quantity;

    if (newTotal > product.rows[0].stock) {
        return res.status(400).json({
        error: `Estoque insuficiente. Já tem ${currentQuantity} no carrinho, estoque disponível: ${product.rows[0].stock}`
        });
    }

    const item = await db.query(
      `INSERT INTO cart_items (cart_id, product_id, quantity)
       VALUES ($1, $2, $3)
       ON CONFLICT (cart_id, product_id)
       DO UPDATE SET quantity = cart_items.quantity + EXCLUDED.quantity
       RETURNING *`,
      [cartsId, productId, quantity]
    );

    res.status(200).json({ message: 'Create carts ok', data: item.rows })    
})

/**
 * @swagger
 * /list-carts/{id}:
 *   get:
 *     summary: Lista os carrinhos de um usuário
 *     tags: [Carts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Lista de carrinhos do usuário
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: ok
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/CartList'
 * 
 *       401:
 *         description: Não autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorMessage'
 */

routeCarts.get('/list-carts/:id', AuthorizationJwt, async (req, res) => {
    const { id } = req.params

    const listCarts = await db.query(`
        select c.id as cartid, u.id as userid, u.name,u.email, c.created_at as creatCart from users u
        join carts c on u.id = c.user_id
        where u.id = $1`,
        [id]
    )

    res.status(200).json({ message: 'ok', data: listCarts.rows })
})

/**
 * @swagger
 * /list-carts/:
 *   get:
 *     summary: Lista todos os carrinhos
 *     tags: [Carts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de todos os carrinhos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: ok
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/CartList'
 *
 *       401:
 *         description: Token inválido ou ausente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorMessage'
 *
 *       403:
 *         description: Acesso negado (não é admin)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorMessage'
 */

routeCarts.get('/list-carts/', AuthorizationJwt, authRoles.isAdmin, async (req, res) => {
    const listCarts = await db.query(`
        select * from carts`
    )

    res.status(200).json({ message: 'ok', data: listCarts.rows })
})

/**
 * @swagger
 * /delete-carts/{id}:
 *   delete:
 *     summary: Deleta um carrinho pelo ID
 *     tags: [Carts]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID do carrinho a ser deletado
 *
 *     responses:
 *       200:
 *         description: Carrinho deletado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Deletado com sucesso ok"
 *
 *       400:
 *         description: Erro ao deletar carrinho
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorMessage'
 *
 *       401:
 *         description: Token ausente ou inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorMessage'
 *
 *       403:
 *         description: Acesso negado (usuário não possui permissão)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorMessage'
 */

routeCarts.delete('/delete-carts/:id', AuthorizationJwt, authRoles.isAuthenticated, async (req, res) => {
    const { id } = req.params

    const deleteProducts = await db.query(`
        delete from carts where id = $1;
    `, [id])

    if (deleteProducts.rowCount === 0) {
        return res.status(400).json({ message: 'erro no delete' })
    }

    res.status(200).json({ message: 'Deletado com sucesso ok'})

})

export default routeCarts