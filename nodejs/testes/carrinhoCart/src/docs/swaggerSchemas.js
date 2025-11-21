/**
 * @swagger
 * components:
 *   schemas:
 *     CartItem:
 *       type: object
 *       properties:
 *         cart_id:
 *           type: string
 *           format: uuid
 *         product_id:
 *           type: string
 *           format: uuid
 *         quantity:
 *           type: integer
 *           example: 3
 *
 *     ErrorMessage:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           example: "Erro genérico"
 * 
 *     CartList:
 *       type: object
 *       properties:
 *         cartid:
 *           type: string
 *           format: uuid
 *           example: "c41e9f78-9ed6-4f00-bfc7-219bcfcf1f4b"
 *         userid:
 *           type: string
 *           format: uuid
 *           example: "0b7d3d73-15b1-4b97-b6d9-992f04c1284a"
 *         name:
 *           type: string
 *           example: "Naruto Uzumaki"
 *         email:
 *           type: string
 *           format: email
 *           example: "naruto@gmail.com"
 *         creatCart:
 *           type: string
 *           format: date-time
 *           example: "2025-01-01T12:30:00Z"
 */
