const app=require('express')
const {CreateUser}=require('../controller/registration_controller')
const router=app.Router()
router.route('/registers').post(CreateUser)
module.exports = router;