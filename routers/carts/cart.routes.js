const express = require('express');
const path = require('path');
const cartsController = require('../../controllers/carts.controller');
const router = express.Router();
const { auth } = require('../../middlewares/auth');
const requestLogger = require('../../middlewares/requestLogger');
const { CartsDao } = require('../../models/daos/app.daos');
const checkoutController = require('../../controllers/checkout.controllers')

const CartModel = new CartsDao()


router.get('/', cartsController.getCarts)
router.get('/:id/products', cartsController.getProductsInCart)
router.post('/', cartsController.saveCart)
router.post('/:id/products/:id_prod', cartsController.updateCart)
router.delete('/:id', cartsController.deleteCart)
router.delete('/:id/products/:id_prod', cartsController.deleteProductById)

router.get('/cart', auth, requestLogger, async (req, res) => {
    res.render(path.resolve('Public/views/pages/cart/cartView.ejs'), { cart: await CartModel.getProductsInCart(req.user.cart), user: req.user });
});

router.post('/checkout/:idCart', requestLogger, checkoutController.checkout)


module.exports = router;