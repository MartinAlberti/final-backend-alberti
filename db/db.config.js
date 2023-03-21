const envConfig = require('../config');

module.exports = {
    mongodb: {
        uri: `mongodb+srv://MartinAdmin:${envConfig.DB_PASSWORD}@cluster0.c47nijl.mongodb.net/Ecommerce?retryWrites=true&w=majority`
    }
}

