const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports = new Schema({
    username: { type: String, required: true },
    text: { type: String, required: true },
    date: { type: String, required: true }
})
