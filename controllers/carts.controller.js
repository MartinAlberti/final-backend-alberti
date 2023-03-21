const { HTTP_STATUS } = require("../constants/api.constants");
const { successResponse } = require("../utils/utils");
const { CartsDao } = require('../models/daos/app.daos')

const cartsDao = new CartsDao();

class CartsController {

    async getCarts(req, res, next) {
        try {
            const carts = await cartsDao.getAll();
            const response = successResponse(carts);
            res.status(HTTP_STATUS.OK).json(response);
        }
        catch (error) {
            next(error);
        }
    }

    async getCartById(req, res, next) {
        const { id } = req.params;
        try {
            const cart = await cartsDao.getById(id);
            const response = successResponse(cart);
            res.status(HTTP_STATUS.OK).json(response);
        }
        catch (error) {
            next(error);
        }
    }

    async saveCart(req, res, next) {
        try {
            const newCart = await cartsDao.createCart(req.body);
            const response = successResponse(newCart);
            res.status(HTTP_STATUS.CREATED).json(response);
        }
        catch (error) {
            next(error);
        }
    }

    async updateCart(req, res, next) {
        const { id, id_prod } = req.params;
        try {
            const updateCart = await cartsDao.addProduct(id, id_prod);
            const response = successResponse(updateCart);
            res.status(HTTP_STATUS.OK).json(response);
        }
        catch (error) {
            next(error);
        }
    }

    async emptyCart(req, res, next) {
        const { id } = req.params;
        try {
            const emptyCart = await cartsDao.delete(id);
            const response = successResponse(emptyCart);
            res.status(HTTP_STATUS.OK).json(response);
        }
        catch (error) {
            next(error);
        }
    }

    async deleteCart(req, res, next) {
        const { id } = req.params;
        try {
            const deletedCart = await cartsDao.delete(id);
            const response = successResponse(deletedCart);
            res.status(HTTP_STATUS.OK).json(response);
        }
        catch (error) {
            next(error);
        }
    }

    async getProductsInCart(req, res, next) {
        const { id } = req.params;
        try {
            const productsInCart = await cartsDao.getProductsInCart(id);
            const response = successResponse(productsInCart);
            res.status(HTTP_STATUS.OK).json(response);
        }
        catch (error) {
            next(error);
        }

    }

    async deleteProductById(req, res, next) {
        const { id, id_prod } = req.params;
        try {
            const productsInCart = await cartsDao.deleteProductById(id, id_prod);
            const response = successResponse(productsInCart);
            res.status(HTTP_STATUS.OK).json(response);
        }
        catch (error) {
            next(error);
        }

    }
}

module.exports = new CartsController();