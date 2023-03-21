const mongoose = require('mongoose');
const { HTTP_STATUS } = require('../constants/api.constants');
const { HttpError } = require('../utils/utils');
const MongoContainer = require('./containers/mongo.container');
const messageSchema = require('./schemas/Messages.schema')

const collection = 'messages'

class MessagesDao extends MongoContainer {
    constructor() {
      super(collection, messageSchema);
    }
  
    async getByUsername(username) {
      const documents = await this.model.find({ username: username }, { __v: 0 }).lean();
      if (!documents.length) {
        const message = `Resources with username: ${username} does not exist in our records`;
        throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
      }
      return documents;
    }
  }
  
  module.exports = new MessagesDao();