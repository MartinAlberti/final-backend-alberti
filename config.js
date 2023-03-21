const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  NODE_ENV: process.env.NODE_ENV || "development",
  DB_PASSWORD: process.env.DB_PASSWORD,
  DATASOURCE: process.env.DATASOURCE || "mongo",
  ACCOUNT_SID: process.env.ACCOUNT_SID,
  AUTH_TOKEN: process.env.AUTH_TOKEN,
  TWILIO_PHONE_NUMBER: process.env.TWILIO_PHONE_NUMBER,
  TWILIO_WHATSAPP : process.env.TWILIO_WHATSAPP,
  GMAIL_PASSWORD: process.env.GMAIL_PASSWORD,
  ETHEREAL_PASSWORD: process.env.ETHEREAL_PASSWORD,
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  ADMIN_NUMBER : process.env.ADMIN_NUMBER,
  APIKEY_MAILGUN: process.env.APIKEY_MAILGUN,
  DOMAIN_MAILGUN: process.env.DOMAIN_MAILGUN,
  DB_NAME: process.env.DB_NAME || "test",
};
