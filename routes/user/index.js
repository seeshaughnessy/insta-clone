const router = require('express').Router();
const controller = require('./controller');

router.post('/login', controller.login); //host/user/login
router.post('/register', controller.register); //host/user/register
router.post('/getprofile', controller.getProfile); //host/user/getprofile

router.post('/updateprofile', controller.updateProfile);

module.exports = router;
