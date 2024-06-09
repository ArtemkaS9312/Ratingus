const adminService = require('../service/admin-service');
const AdminService = require('../service/admin-service')
const {validationResult} = require('express-validator');
const ApiErrors = require('../exceptions/api_errors');
const Admin = require('../models/admin-model');

class AdminController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiErrors.BadRequest('Ошибка при валидации', errors.array()));
            }
            const { email, password } = req.body;
            const adminData = await adminService.registration(email, password);
            res.cookie('refreshToken', adminData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.json(adminData);
        } catch (e) {
            next(e);
        }
    }
    async login(req, res, next) {
        try {
            const {email, password} = req.body;
            const adminData = await adminService.login(email, password);
            res.cookie('refreshToken', adminData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.json(adminData);
        }catch(e) {
            next(e);
        }
    }
    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const token = await adminService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token);
        }catch(e) {
            next(e);
        }
    }
    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const adminData = await adminService.refresh(refreshToken);
            res.cookie('refreshToken', adminData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.json(adminData);
        }catch(e) {
            next(e);
        }
    }
    async getAdmins(req, res, next) {
        try {
            const admin = await adminService.getAllAdmin();
            return res.json(admin);
        }catch(e) {
            next(e);
        }
    }
}


module.exports = new AdminController();