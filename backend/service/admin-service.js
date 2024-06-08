const AdminModel = require('../models/admin-model');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('./mail-service');
const tokenService = require('./token-service');
const AdminDto = require('../dtos/admin-dto');

class AdminService {
    async registration(email, password) {
        const candidate = await AdminModel.findOne({ where: { email: email } });;
        if(candidate) {
            throw new Error(`Пользователь с почтовым адресом ${email} уже существует`)
        }
        const hashPassword = await bcrypt.hash(password, 3);
        const activationLink = uuid.v4();

        const admin = await AdminModel.create({email, password: hashPassword} )
        await mailService.sendActivationMail(email, activationLink);

        const adminDto = new AdminDto(admin)
        const tokens = tokenService.generateToken({...adminDto});
        await tokenService.saveToken(adminDto.id, tokens.refreshToken);


        return {...tokens, admin: adminDto}
    }
}

module.exports = new AdminService();