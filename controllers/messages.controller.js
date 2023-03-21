const envConfig = require("../config");
const { HTTP_STATUS } = require("../constants/api.constants");
const { HttpError } = require("../utils/utils");
const MessageDTO = require("../models/dtos/messages.dto");
const Messages = require("../models/messages.mongo");

const messagesDao = new Messages();


class MessagesController {
  constructor() {
    this.messagesDao = messagesDao;
  }

  async getMessages(req, res, next) {
    try {
      const messages = await this.messagesDao.getMessages();
      const response = successResponse(messages);
      res.status(HTTP_STATUS.OK).json(response);
    } catch (error) {
      next(error);
    }
  }

  // async getMessagesByUsername(username) {
  //   if (!username) {
  //     throw HttpError(HTTP_STATUS.BAD_REQUEST, `username must be provided it`);
  //   }
  //   return this.messagesDao.getByUsername(username);
  // }

  async saveMessage(req, res, next) {
    try {
      const newMessage = await this.messagesDao.createMessage(req.body);
      const response = successResponse(newMessage);
      res.status(HTTP_STATUS.CREATED).json(response);
    } catch (error) {
      next(error);
    }
  }

  // async deleteMessage(_id) {
  //   if (!_id) {
  //     throw HttpError(HTTP_STATUS.BAD_REQUEST, `id must be provided it`);
  //   }
  //   return this.messagesDao.delete(_id);
  // }
}

module.exports = MessagesController;
