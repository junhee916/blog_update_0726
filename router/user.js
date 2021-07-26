const express = require('express')
const router = express.Router()
const checkAuth = require('../middleware/check-auth')
const {
    users_delete_all,
    users_delete_user,
    users_get_all,
    users_get_user,
    users_login,
    users_signup,
    users_update
} = require('../controller/user')

// total get userInfo 
router.get('/', users_get_all)

// detail get userInfo
router.get('/:userId', checkAuth, users_get_user)

/*
* signup 
* data - name, email, password / bcript.hash 진행
*/

router.post('/signup', users_signup)

/*
* login
* data - email, password / bcrypt.compare 진행 
* jsonwebtoken sign 
*/

router.post('/login', users_login)

// update userInfo 
router.put('/:userId', checkAuth, users_update)

// total delete userInfo
router.delete('/', users_delete_all)

// detail delete userInfo
router.delete('/:userId', checkAuth, users_delete_user)

module.exports = router