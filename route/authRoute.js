const { signup ,login, userDetails , logout, verifyToken} = require('../controller/authController');

const router = require('express').Router();

router.route('/signup').post(signup);
router.route('/login').post(login);
router.route('/userDetails').get(verifyToken,userDetails);
router.route('/logout').post(logout);

module.exports = router;