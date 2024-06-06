const AdminModel = require('../models/admin-model');
const bcrypt = require('bcrypt');
class AdminService {
    async registration(email, password) {
        const candidate = await AdminModel.findOne({email});
        if(candidate) {
            throw new Error('Пользователь с почтовым адресом ${email} уже существует')
        }
        const hashPassword = await bcrypt.hash(password, 3)
        const admin = await AdminModel.create({email, password: hashPassword} )
    }
}

module.exports = new AdminService();