const app=require('express')
const {AssignedOrders}=require('../controller/Courier_controller')
const {UpdateOrderStatus}=require('../controller/Courier_controller')
const router = app.Router()
const authenticateToken = require('../middleware/authenticateToken');

router.route ('/assignedorders').get(authenticateToken,AssignedOrders)
router.route ('/updateorderstatus').post(authenticateToken,UpdateOrderStatus)
module.exports = router;