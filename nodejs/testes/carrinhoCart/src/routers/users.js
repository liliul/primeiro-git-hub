import express from 'express'
import db from '../db/indexDB.js'
import { authRoles } from '../middleware/roles.js'
import AuthorizationJwt from '../middleware/auth.js'
import UsersController from '../mvc/users/usersController.js'

const routerUsers = express.Router()

const usersController = new UsersController(db)

routerUsers.post('/create-users', 
    usersController.createUsers.bind(usersController)
)

routerUsers.post('/login', 
    usersController.loginUsers.bind(usersController)
)


routerUsers.delete('/delete-users/:id', 
    AuthorizationJwt, 
    authRoles.isSuperAdmin, 
    usersController.deleteUsers.bind(usersController)
)

routerUsers.put('/update-users/:id', 
    AuthorizationJwt, 
    authRoles.isAuthenticated,
    usersController.updateUsers.bind(usersController)
)

routerUsers.get('/list-users', 
    AuthorizationJwt, 
    authRoles.isAdmin, 
    usersController.listUsers.bind(usersController)
) 

export default routerUsers