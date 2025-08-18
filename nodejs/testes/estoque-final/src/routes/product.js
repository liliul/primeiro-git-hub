const express = require('express')
const ApiProduct = require('../api/product');
const authMiddleware = require('../middleware/auth');

const productRouter = express.Router();

productRouter.get('/', authMiddleware(), ApiProduct.FindAll)
productRouter.get('/:id', authMiddleware(), ApiProduct.FindById)
productRouter.post('/', authMiddleware(), ApiProduct.Create)
productRouter.put('/:id', authMiddleware(), ApiProduct.Update)
productRouter.delete('/:id', authMiddleware(), ApiProduct.Delete)

module.exports = productRouter