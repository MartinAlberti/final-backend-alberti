const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    age: { type: Number, required: true },
    birthDate: { type: Date, required: true },
    phoneNumber: { type: Number, required: true },
    admin: { type: Boolean, default: false },
    cart: { type: String, required: true },
    profilePicture: { type: String }
})
