import express from 'express'
import routerUsers from './routers/users.js'
import routerProducts from './routers/products.js'
import routeCarts from './routers/cart.js'
import routerCartItems from './routers/cartItems.js'
import routerCheckout from './routers/checkout.js'
import routerSuperAdmin from './routers/superAdmin.js'
import dotenv from "dotenv";
dotenv.config();

import { swaggerUi, swaggerSpec } from "../swagger.js"

const app = express()

app.use(express.json())
app.use('/v1/', routerSuperAdmin)
app.use('/v1/', routerUsers)
app.use('/v2/', routerProducts)
app.use('/v3/', routeCarts)
app.use('/v3/', routerCartItems)
app.use('/v1/', routerCheckout)

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.listen(3001,() => {
    console.log('port 3001');
})