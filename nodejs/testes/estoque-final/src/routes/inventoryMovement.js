const express = require('express');
const inventoryMovement = require('../api/inventoryMovement');
const authMiddleware = require('../middleware/auth');

const movementRouter = express.Router();

movementRouter.get('/:inventoryId/', authMiddleware(), inventoryMovement.FindAll)
movementRouter.get('/:inventoryId/:id', authMiddleware(), inventoryMovement.FindById)
movementRouter.post('/:inventoryId/', authMiddleware(), inventoryMovement.Create)
movementRouter.put('/:inventoryId/:id', authMiddleware(), inventoryMovement.Update)
movementRouter.delete('/:inventoryId/:id', authMiddleware(), inventoryMovement.Delete)

module.exports = movementRouter