const express = require('express');
const { webAuth, homeAuth, auth } = require('../middlewares/auth');
const router = express.Router();
const authRoutes = require('./auth/auth.routes')
const productsRoutes = require('./products/products.routes')
const cartsRoutes = require('../routers/carts/cart.routes');
const logger = require("../logger/logger")
const requestLogger = require("../middlewares/requestLogger")
const path = require('path');
const Products = require('../models/products.mongo');
const infoRoutes = require("./info/info.routes")

const ProductsModel = new Products()

router.use('/auth', requestLogger, authRoutes)
router.use('/products', requestLogger, productsRoutes)
router.use('/carts', requestLogger, cartsRoutes)
router.use('/info', requestLogger, infoRoutes)


router.get('/', webAuth, requestLogger, async (req, res) => {
    res.sendFile(path.resolve('Public/login.html'));
});

router.get('/home', homeAuth, requestLogger, async (req, res) => {
    let { category } = req.query;
    if (category) res.render(path.resolve('Public/index.ejs'), { products: await ProductsModel.getByCategory(category), user: req.user });
    else res.render(path.resolve('Public/index.ejs'), { products: await ProductsModel.getAll(), user: req.user });
});

router.get('/admin', auth, requestLogger, async (req, res) => {
    res.render(path.resolve('Public/views/pages/admin/admin.ejs'), { products: await ProductsModel.getAll(), user: req.user });
});




router.get('*', (req, res) => {
    // console.log(req)
    logger.warn({ msg: `${req.url} method:${req.method} not found` })
    res.status(404).send('Página no encontrada')
})



module.exports = router;