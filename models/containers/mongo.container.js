const mongoose = require('mongoose');
const { HTTP_STATUS } = require('../../constants/api.constants');
const dbConfig = require('../../db/db.config');
const { HttpError } = require('../../utils/utils');

class MongoContainer {

  constructor(collection, schema) {
    this.model = mongoose.model(collection, schema);
  }

  async connect() {
    await mongoose.connect(dbConfig.mongodb.uri);
  }

  async disconnect() {
    await mongoose.disconnect();
  }

  async getAll(filter = {}) {
    const documents = await this.model.find(filter, { __v: 0 }).lean();
    return documents;
  }

  async getById(id) {
    const document = await this.model.findOne({ _id: id }, { __v: 0 });
    if (!document) {
      const message = `Resource with id ${id} does not exist in our records`;
      throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
    }
    return document;
  }
  async getByCategory(category) {
    const documents = await this.model.find({ category: category }, { __v: 0 }).lean();
    if (!documents) {
        const message = `Resource with id ${id} does not exist in our records`;
        throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
    }
    return documents;
}

  async save(item) {
    const newDocument = new this.model(item);
    return await newDocument.save();
  }

  async update(id, item) {
    const updatedDocument = await this.model.updateOne(
      { _id: id },
      { $set: { ...item } }
    );
    if (!updatedDocument.matchedCount) {
      const message = `Resource with id ${id} does not exist in our records`;
      throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
    }
    return updatedDocument;
  }

  async delete(id) {
    return await this.model.deleteOne({ _id: id });
  }
}

module.exports = MongoContainer;