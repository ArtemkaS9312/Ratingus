const jwt = require('jsonwebtoken');
const tokenModel = require('../models/token-model');
require('dotenv').config(); 

class TokenService {
    generateToken(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '30m' });
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });
        return {
            accessToken,
            refreshToken
        };
    }

    validateAccessToken(token) {
        try {
            const adminData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            return adminData;
        } catch(e) {
            return null;
        }
    }

    validateRefreshToken(token) {
        try {
            const adminData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
            return adminData;
        } catch(e) {
            return null;
        }
    }

    async saveToken(adminId, refreshToken) {
        const tokenData = await tokenModel.findOne({ where: { admin: adminId } });
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }
        const token = await tokenModel.create({ admin: adminId, refreshToken });
        return token;
    }

    async removeToken(refreshToken) {
        const tokenData = await tokenModel.destroy({ where: { refreshToken } }); 
        return tokenData;
    }

    async findToken(refreshToken) {
        const tokenData = await tokenModel.findOne({ where: { refreshToken } }); 
        return tokenData;
    }
}

module.exports = new TokenService();