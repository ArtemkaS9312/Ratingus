const adminService = require('../service/admin-service');
const AdminService = require('../service/admin-service')

class AdminController {
    async registration(req, res, next) {
        try {
            const {email, password} = req.body;
            const adminData = await adminService.registration(email, password);
            res.cookie('refreshToken', adminData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(adminData);
        }catch(e) {
            console.log(e);
        }
    }
    async login(req, res, next) {
        try {

        }catch(e) {

        }
    }
    async logout(req, res, next) {
        try {

        }catch(e) {

        }
    }
    async activate(req, res, next) {
        try {

        }catch(e) {

        }
    }
    async refresh(req, res, next) {
        try {

        }catch(e) {

        }
    }
    async getAdmins(req, res, next) {
        try {
            res.json(['123', '4546']);
        }catch(e) {

        }
    }
}


module.exports = new AdminController();