const jwt = require('jsonwebtoken');
const tokenModel = require('../models/token-model');
require('dotenv').config(); // Load environment variables

class TokenService {
    generateToken(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '30m'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'})
        return {
            accessToken,
            refreshToken
        }
    }
    async saveToken(adminId, refreshToken) {
        const tokenData = await tokenModel.findOne({admin: adminId})
        if(tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }
        const token = await tokenModel.create({admin: adminId, refreshToken});
        return token;
    }   
}

module.exports = new TokenService();