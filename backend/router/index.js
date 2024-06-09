const Router = require('express').Router;
const AdminController = require('../controllers/admin-controller');
const router = new Router();
const {body} = require('express-validator');
const authMiddleware = require('../middlewares/auth-middleware');

router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 32}),
    AdminController.registration);
router.post('/login', AdminController.login);
router.post('/logout', AdminController.logout);
router.get('/refresh', AdminController.refresh);
router.get('/admins', authMiddleware, AdminController.getAdmins);

module.exports = router