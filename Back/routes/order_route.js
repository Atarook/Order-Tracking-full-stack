const app=require('express')
const {CreateOrder}=require('../controller/Order_controller')
const authenticateToken = require('../middleware/authenticateToken'); // Adjust the path as necessary
const router=app.Router()
router.route('/creatorder').post(authenticateToken,CreateOrder)
module.exports = router;