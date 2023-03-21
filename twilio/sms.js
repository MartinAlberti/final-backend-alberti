const twilio = require("twilio")
const envConfig = require('../config');


const ACCOUNT_SID = envConfig.ACCOUNT_SID
const AUTH_TOKEN =  envConfig.AUTH_TOKEN
const TWILIO_PHONE_NUMBER = envConfig.TWILIO_PHONE_NUMBER

const twilioClient = twilio(ACCOUNT_SID, AUTH_TOKEN);

const sendSMS = async () => {
    try{
const messageResponse = await twilioClient.messages.create({
    body:"Hola, soy un sms creado desde Node.js",
    from: TWILIO_PHONE_NUMBER,
    to:"+543512377804"
})
console.log(messageResponse)
    }
    catch(error) {
        console.log("error")
        console.log(error.message)
    }
}
sendSMS()