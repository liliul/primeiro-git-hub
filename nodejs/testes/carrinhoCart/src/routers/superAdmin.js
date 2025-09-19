import express from 'express'
import db from '../db/indexDB.js'
import SuperAdminController from '../mvc/superAdmin/superAdminController.js'
import AuthorizationJwt from '../middleware/auth.js'
import { authRoles } from '../middleware/roles.js' 

const routerSuperAdmin = express.Router()

const superAdmin = new SuperAdminController(db)

routerSuperAdmin.post('/new-role/:id', 
    AuthorizationJwt, 
    authRoles.isSuperAdmin, 
    superAdmin.newRoles.bind(superAdmin)
)

export default routerSuperAdmin