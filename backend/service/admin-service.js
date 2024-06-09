const AdminModel = require('../models/admin-model');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const tokenService = require('./token-service');
const AdminDto = require('../dtos/admin-dto');
const ApiErrors = require('../exceptions/api_errors');

class AdminService {
    async registration(email, password) {
        const candidate = await AdminModel.findOne({ where: { email: email } });  
        if(candidate) {
            throw ApiErrors.BadRequest(`Пользователь с почтовым адресом ${email} уже существует`);
        }
        const hashPassword = await bcrypt.hash(password, 3);
        const activationLink = uuid.v4();

        const admin = await AdminModel.create({email, password: hashPassword} );

        const adminDto = new AdminDto(admin);
        const tokens = tokenService.generateToken({...adminDto});
        await tokenService.saveToken(adminDto.id, tokens.refreshToken);
        return {...tokens, admin: adminDto};
    }

    async login(email, password) {
        const admin = await AdminModel.findOne({ where: { email: email } });  
        if(!admin) {
            throw ApiErrors.BadRequest('Администратора с таким email не существует');
        }
        const isPassEquals = await bcrypt.compare(password, admin.password);
        if(!isPassEquals) {
            throw ApiErrors.BadRequest('Введён неверный пароль');
        }
        const adminDto = new AdminDto(admin);
        const tokens = await tokenService.generateToken({...adminDto});
        await tokenService.saveToken(adminDto.id, tokens.refreshToken);
        return {...tokens, admin: adminDto};
    }
    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }
    async refresh(refreshToken) {
        if(!referencesToken) {
            throw ApiErrors.UnauthorizedError()
        }
        const adminData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDB =  await tokenService.findToken(refreshToken);
        if(!adminData || !tokenFromDB) {
            throw ApiErrors.UnauthorizedError();
        }
        const admin = await AdminModel.findById(adminData.id);
        const adminDto = new AdminDto(admin);
        const tokens = await tokenService.generateToken({...adminDto});
        await tokenService.saveToken(adminDto.id, tokens.refreshToken);
        return {...tokens, admin: adminDto};
    }

    async getAllAdmin() {
        const admin = await AdminModel.findAll();
        return admin;
    }
}

module.exports = new AdminService();
