const express = require('express')
const ApiOrganization = require('../api/organization');
const authMiddleware = require('../middleware/auth');

const organizationRouter = express.Router();

organizationRouter.get('/:id', authMiddleware('admin'), ApiOrganization.FindById)
organizationRouter.post('/', ApiOrganization.Create)
organizationRouter.put('/:id', authMiddleware('admin'), ApiOrganization.Update)
organizationRouter.delete('/:id', authMiddleware('admin'), ApiOrganization.Delete)

module.exports = organizationRouter