const { sendEmail, sendWaNotification, sendSMS } = require('../utils/utils')
const envConfig = require('../config');
const { HTTP_STATUS } = require('../constants/api.constants');
const { CartsDao } = require('../models/daos/app.daos');

const cartDao = new CartsDao()

class CheckoutController {

    async checkout(req, res, next) {
        try {
            let { idCart } = req.params;
            let productsInCart = await cartDao.getProductsInCart(idCart)
            let parsedData = `Nuevo pedido de ${req.user.email}\n\n${JSON.stringify(productsInCart)}`
            let response = sendEmail(envConfig.ADMIN_EMAIL, 'New order', parsedData);
            sendWaNotification(parsedData, envConfig.ADMIN_NUMBER)
            sendSMS('Recibimos tu pedido de manera exitosa, estamos procesandolo', req.user.phoneNumber)
            res.status(HTTP_STATUS.CREATED).json(response);
        } catch (error) {
            next(error);
        }

    }

}

module.exports = new CheckoutController()