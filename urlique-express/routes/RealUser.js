const express = require('express')
const router = express.Router()
const realUserControllers = require('../controllers/RealUser')
const passport = require('passport')

const authentication = passport.authenticate('jwt', {session: false})

router.post('/register', realUserControllers.registerUser)
router.post('/login', realUserControllers.loginUser)
router.get('/',  realUserControllers.getUsers);
router.get('/:username', realUserControllers.getUserByUsername);
router.put('/', authentication, realUserControllers.updateProfile);
router.get('/:id', realUserControllers.getUserById);


module.exports = router