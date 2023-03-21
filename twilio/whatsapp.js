const twilio = require("twilio")
const envConfig = require('../config');


const ACCOUNT_SID = envConfig.ACCOUNT_SID
const AUTH_TOKEN =  envConfig.AUTH_TOKEN
const TWILIO_WHATSAPP = "whatsapp:+14155238886"

const twilioClient = twilio(ACCOUNT_SID, AUTH_TOKEN);

const sendWhatsapp = async () => {
    try{
const messageResponse = await twilioClient.messages.create({
    body:"Mensaje de whatsapp",
    from: TWILIO_WHATSAPP,
    to:"whatsapp:+5493512377804",
    mediaUrl: [
        "https://definicion.de/wp-content/uploads/2013/03/perro-1.jpg"
    ],
})
console.log(messageResponse)
    }
    catch(error) {
        console.log("error")
        console.log(error.message)
    }
}
sendWhatsapp()   