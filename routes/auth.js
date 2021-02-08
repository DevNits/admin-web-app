const { Router } = require('express');
const { activateAccount, login_post, login_get, logout_get, home_get } = require('../controller/auth');
// const { requireAuth } = require('../middleware/auth');
const { signup_post } = require('../controller/mail');
const router = Router();

router.get('/', home_get);

router.post('/signup', signup_post);
router.get('/authentication/activate/:token', activateAccount);

router.post('/signin', login_post);
router.get('/signin', login_get);

router.get('/signout', logout_get);

module.exports = router;