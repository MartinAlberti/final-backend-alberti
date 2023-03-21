const mongoContainer = require("../../containers/mongo.container");
const productSchema = require("../../schemas/Product.schema");

const collection = "products";

class Products extends mongoContainer {
  constructor() {
    super(collection, productSchema);
  }

}

module.exports = new Products();
