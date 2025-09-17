import express from 'express'
import db from '../db/indexDB.js'
import ProductsController from '../mvc/products/productsController.js'
import AuthorizationJwt from '../middleware/auth.js'
import { authRoles } from '../middleware/roles.js'

const routerProducts = express.Router()

const productsController = new ProductsController(db)

routerProducts.post('/create-products', 
    AuthorizationJwt, 
    authRoles.isAdmin, 
    productsController.createProducts.bind(productsController)
)

routerProducts.delete('/delete-products/:id', 
    AuthorizationJwt, 
    authRoles.isAdmin,
    productsController.deleteProducts.bind(productsController)
)

routerProducts.put('/update-products/:id', 
    AuthorizationJwt, 
    authRoles.isAdmin, 
    productsController.updateProducts.bind(productsController)
)

routerProducts.get('/list-products', 
    AuthorizationJwt,
    authRoles.isAdmin,
    productsController.listProducts.bind(productsController)
 )

export default routerProducts