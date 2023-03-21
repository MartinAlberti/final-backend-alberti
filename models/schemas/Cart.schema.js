const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports = new Schema({
    timestamp: { type: String },
    products: [{ type: Schema.Types.ObjectId }],
    cant: { type: Number }
})