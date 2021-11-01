const express = require('express');
const { signUp, signIn, Home } = require('../controllers/auth');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, Home);
router.post('/signup', signUp);
router.post('/signin', signIn);

module.exports = router;
