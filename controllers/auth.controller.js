const bcrypt = require('bcrypt');
const { getAge, validateEmail, sendEmail } = require('../utils/utils')
const passport = require('passport')
const Users = require('../models/user.mongo');
const multer = require('multer');
const envConfig = require('../config');
const UsersModel = new Users();
const { CartsDao } = require('../models/daos/app.daos')

const cartsDao = new CartsDao();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'Public/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, `${req.body.username}.${file.originalname.split('.')[1]}`)
    }
})

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    }
});





class AuthControllers {
    
    async logout(req, res, next) {
        const user = req.user
        if (user && user.email) {
            req.session.destroy(err => {
                if (!err) {
                    res.render(path.join(process.cwd(), 'Public/views/pages/logout.ejs'), { email: user.email })
                } else {
                    res.redirect('/')
                }
            })
        } else {
            res.redirect('/')
        }
    }
    async register(req, res, next) {
        let { username, password, address, birthDate, countryCode, phoneNumber } = req.body
        let cart = await cartsDao.createCart()
        let profilePicture = `Avatar${Math.floor(Math.random() * 12) + 1}.png`
        if (req.file) profilePicture = `${username}.${req.file.originalname.split('.')[1]}`
        let newUser = {
            email: username,
            password: await bcrypt.hash(password, 10),
            address: address,
            age: getAge(birthDate),
            birthDate: birthDate,
            phoneNumber: countryCode + phoneNumber,
            cart: cart._id,
            profilePicture
        }

        const user = await UsersModel.save(newUser)

        const textForEmail = `
        Username: ${username}\n
        Address: ${address}\n
        Age: ${getAge(birthDate)}\n
        Birthdate: ${birthDate}\n
        Phone Number: ${countryCode + phoneNumber}\n`

        sendEmail(envConfig.ADMIN_EMAIL, 'New Register', textForEmail)

        passport.authenticate('local')(req, res, function () {
            res.redirect('/home');
        });

    }
}

module.exports = { AuthControllers, upload }