const mongoContainer = require('../../containers/mongo.container')
const { Schema } = require('mongoose')
const { HttpError } = require('../../../utils/utils')
const { HTTP_STATUS } = require('../../../constants/api.constants')
const productsDao = require('../products/productsDao.mongo')
const cartSchema = require("../../schemas/Cart.schema")

// const productsDao = new Products();


const collection = 'carts'


class DaoCartsMongo extends mongoContainer {
    constructor() {
        super(collection, cartSchema)
    }


    async createCart() {
        let item = {
            timestamp: Date.now(),
            products: []
        }
        const newDocument = new this.model(item);
        return await newDocument.save();
    }

    async getProductsInCart(id) {
        const document = await this.model.findOne({ _id: id }, { __v: 0 });
        if (!document) {
            const message = `Resource with id ${id} does not exist in our records`;
            throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
        }
        let products = []
        for (let i = 0; document.products.length > i; i++) {

            let productById = await productsDao.getById(document.products[i])

            let isTheProductInArray = products.find(item => item.title == productById.title)

            if (isTheProductInArray) {
                let index = products.findIndex(item => item.title == productById.title)
                products[index].cant++
            } else {
                productById["cant"] = 1;
                products.push(productById)
            }

        }
        return products;
    }
    async addProduct(id, idProducto) {
        const updatedDocument = await this.model.updateOne(
            { _id: id },
            { $push: { products: idProducto } }
        );
        if (!updatedDocument.matchedCount) {
            const message = `Resource with id ${id} does not exist in our records`;
            throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
        }
        return updatedDocument;
    }

    async deleteProductById(idCart, idProd) {
        const updatedDocument = await this.model.updateOne(
            { _id: idCart },
            { $pull: { products: idProd } }
        );
        if (!updatedDocument.matchedCount) {
            const message = `Resource with id ${idProd} does not exist in our records`;
            throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
        }
        return updatedDocument;
    }
    async delete(idCart) {
        const updatedCart = await this.model.updateOne(
            { _id: idCart },
            { products: [] }
        );
        if (!updatedCart.matchedCount) {
            const message = `Resource with id ${idCart} does not exist in our records`;
            throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
        }
        return updatedCart;
    }

}

module.exports = DaoCartsMongo;