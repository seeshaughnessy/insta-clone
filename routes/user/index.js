const router = require('express').Router();
const controller = require('./controller/');

router.post('/login', controller.login); //host/user/login
router.post('/register', controller.register); //host/user/register

module.exports = router;
