import express from 'express'
import db from '../db/indexDB.js'
import AuthorizationJwt from '../middleware/auth.js'
import CheckoutController from '../mvc/checkout/checkoutController.js'

const routerCheckout = express.Router()

const checkout = new CheckoutController(db)

routerCheckout.post("/checkout/", 
  AuthorizationJwt,
  checkout.checkoutController.bind(checkout)
)

routerCheckout.get('/checkout/orders/', 
  AuthorizationJwt,
  checkout.searchCheckoutOrders.bind(checkout)
)

routerCheckout.get('/checkout-id', 
  AuthorizationJwt,
  checkout.searchCheckoutOrdersId.bind(checkout)
)

routerCheckout.put('/checkout/:orderId/status', 
  AuthorizationJwt, 
  checkout.updateCheckoutOrderIdStatus.bind(checkout)     
)

export default routerCheckout