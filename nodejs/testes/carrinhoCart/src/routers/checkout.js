import express from 'express'
import db from '../db/indexDB.js'
import AuthorizationJwt from '../middleware/auth.js'
import CheckoutController from '../mvc/checkout/checkoutController.js'
import { authRoles } from '../middleware/roles.js'

const routerCheckout = express.Router()

const checkout = new CheckoutController(db)

routerCheckout.post("/checkout/", 
  AuthorizationJwt,
  authRoles.isAuthenticated,
  checkout.checkoutController.bind(checkout)
)

routerCheckout.get('/checkout/orders/', 
  AuthorizationJwt,
  authRoles.isAdmin,
  checkout.searchCheckoutOrders.bind(checkout)
)

routerCheckout.get('/checkout/orders/pages', 
  AuthorizationJwt,
  authRoles.isAdmin,
  checkout.searchCheckoutOrdersCursorPages.bind(checkout)
)

routerCheckout.get('/checkout-id', 
  AuthorizationJwt,
  authRoles.isAuthenticated,
  checkout.searchCheckoutOrdersId.bind(checkout)
)

routerCheckout.put('/checkout/:orderId/status', 
  AuthorizationJwt, 
  authRoles.isAuthenticated, 
  checkout.updateCheckoutOrderIdStatus.bind(checkout)     
)

export default routerCheckout