import express from 'express'
import db from '../db/indexDB.js'
import { z } from "zod"
import AuthorizationJwt from '../middleware/auth.js'
import { authRoles } from '../middleware/roles.js'

const routerProducts = express.Router()

const productSchema = z.object({
  name: z.string()
    .min(3, "O nome do produto deve ter pelo menos 3 caracteres"),
  price: z.preprocess(
    (val) => Number(val),
    z.number().nonnegative("Preço deve ser >= 0")
  ),
  stock: z.preprocess(
    (val) => Number(val),
    z.number().int().nonnegative("Stock deve ser >= 0")
  )
})
routerProducts.post('/create-products', AuthorizationJwt, authRoles.isAdmin,  async (req, res) => {
    const validation = productSchema.safeParse(req.body)

    if (!validation.success) {
        return res.status(400).json({
            message: "Erro de validação",
            errors: validation.error.errors
        })
    }
    const { name, price, stock } = validation.data
    console.log(name,price, stock);
    
    // if (name.length < 3) {
    //     return res.status(401).json({
    //         message: 'o nome do produto não pode ser menor que 3',
    //         err: `Nome do produto que voce digitou (${name})`
    //     })
    // }
    // if (stock < 0) {
    //     return res.status(401).json({message: 'stock não pode ser menor que 0'})
    // }
    // if (price < 0) {
    //     return res.status(401).json({message: 'preço não pode ser menor que 0'})
    // }

    try {
        const users = await db.query(`
            INSERT INTO products (name, price, stock) 
            VALUES ($1, $2, $3);
            `, [name, price, stock])

        // console.log(users);
        res.status(200).json({ message: 'ok', data: users.rowCount})
    } catch (error) {
        res.status(500).json({ 
            message: "Erro no update", 
            error: error.message 
        })
    }
    
})

routerProducts.get('/list-products', AuthorizationJwt, async (req, res) => {
    const listUsers = await db.query(`
        select * from products;
    `)

    res.status(200).json({ message: 'ok', data: listUsers.rows })
})

routerProducts.delete('/delete-products/:id', AuthorizationJwt, authRoles.isAdmin, async (req, res) => {
    const { id } = req.params

    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    if (!uuidRegex.test(id)) {
        return res.status(400).json({
        message: 'ID inválido para delete',
        err: `id que você enviou: ${id}`
        })
    }
    
    const deleteProducts = await db.query(`
        delete from products where id = $1;
    `, [id])

    if (!deleteProducts) {
        return res.status(400).json({ message: 'erro no delete' })
    }

    res.status(200).json({ message: 'Deletado com sucesso ok'})

})

routerProducts.put('/update-products/:id', AuthorizationJwt, authRoles.isAdmin, async (req, res) => {
    const { id } = req.params
    const { name, price, stock } = req.body 

    if (!name || typeof name !== "string" || name.length < 3) {
        return res.status(401).json({
            message: 'o nome do produto não pode ser menor que 3',
            err: `Nome do produto que voce digitou (${name})`
        })
    }
    if (stock == null || isNaN(stock) || stock < 0) {
        return res.status(401).json({
            message: 'stock não pode ser menor que 0',
            err: `valor do preço (${stock})`
        })
    }
    if (price == null || isNaN(price) || price < 0) {
        return res.status(401).json({
            message: 'preço não pode ser menor que 0',  
            err: `valor do preço (${price})`
        })
    }

    try {
        const updateProducts = await db.query(`
        update products set 
            name = $1, price = $2, stock = $3 
            where id = $4
        `, [name, price, stock, id])

        if (updateProducts.rowCount === 0) {
            return res.status(400).json({ message: 'produto não encontrado' })
        }

        res.status(200).json({ message: 'Atualizado com sucesso ok'})
    } catch (error) {
        res.status(500).json({ message: 'Erro no update', error: error.message })
    }

})


export default routerProducts