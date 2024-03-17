const express=require('express');
const { registerUser,
    loginUser,
    } = require('../controllers/authController');
const router = express.Router();

router.route('/register').post(registerUser);
router.route('/logins').post(loginUser);
module.exports = router;
