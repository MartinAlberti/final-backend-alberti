const envConfig = require('../../config')

let ProductsDao;
let CartsDao;
let UserDao;

switch (envConfig.DATASOURCE) {
    case 'mongo':
        ProductsDao = require('./products/productsDao.mongo')
        CartsDao = require('./carts/cartsDao.mongo')
        UserDao = require ('./users/usersDao.mongo')

        break;
    default:
        throw new Error("Invalid Datasource")
}

module.exports = {
    CartsDao,
    ProductsDao,
    UserDao
}