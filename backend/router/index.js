const Router = require('express').Router;
const AdminController = require('../controllers/admin-controller');
const router = new Router();

router.post('/registration', AdminController.registration);
router.post('/login', AdminController.login);
router.post('/logout', AdminController.logout);
router.post('/activate/:link', AdminController.activate);
router.post('/refresh', AdminController.refresh);
router.get('/admins', AdminController.getAdmins);

module.exports = router