const express = require('express')
const ApiInventory = require('../api/inventory');
const authMiddleware = require('../middleware/auth');

const inventoryRouter = express.Router();

inventoryRouter.get('/', authMiddleware(), ApiInventory.FindAll)
inventoryRouter.get('/:id', authMiddleware(), ApiInventory.FindById)
inventoryRouter.post('/', authMiddleware(), ApiInventory.Create)
inventoryRouter.put('/:id', authMiddleware(), ApiInventory.Update)
inventoryRouter.delete('/:id', authMiddleware(), ApiInventory.Delete)

module.exports = inventoryRouter