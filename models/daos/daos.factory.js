const UserMongoDao = require("./users/usersDao.mongo");
const ProductMongoDao = require("./products/productsDao.mongo");
const CartMongoDao = require("./carts/cartsDao.mongo");
const MessagesDao = require("./messages/messagesDao.mongo");

const getDAOS = (type) => {
  let productsDao;
  let cartsDao;
  let usersDao;
  let messagesDao;

  switch (type.toLowerCase()) {
    case "mongo":
      productsDao = ProductMongoDao;
      cartsDao = CartMongoDao;
      usersDao = UserMongoDao;
      messagesDao = MessagesDao;
      break;
    default:
      throw new Error("Invalid data source");
  }
  return {
    productsDao,
    cartsDao,
    usersDao,
    messagesDao,
  };
};

module.exports = {
  getDAOS,
};
