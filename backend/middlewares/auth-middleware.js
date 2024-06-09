const ApiErrors = require('../exceptions/api_errors');
const tokenService = require('../service/token-service');

module.exports = function (req, res, next) {
    try { 
        const authorizationHeader = req.headers.authorization; // Исправлено
        if (!authorizationHeader) {
            console.log("Нет заголовка авторизации");
            return next(ApiErrors.UnauthorizedError());
        }
        const accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken) {
            console.log("Токен доступа отсутствует");
            return next(ApiErrors.UnauthorizedError());
        }

        const adminData = tokenService.validateAccessToken(accessToken);
        if (!adminData) {
            console.log("Недействительный токен доступа");
            return next(ApiErrors.UnauthorizedError());
        }

        req.admin = adminData;
        next();
    } catch (e) {
        console.log("Ошибка авторизации:", e);
        return next(ApiErrors.UnauthorizedError());
    }
};
