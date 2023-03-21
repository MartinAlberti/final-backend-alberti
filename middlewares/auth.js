let webAuth = (req, res, next) => {
    if (!req.isAuthenticated()) {
        next()
    } else {
        res.redirect('/home')
    }
}
let auth = (req, res, next) => {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.redirect('/')
    }
}

let homeAuth = (req, res, next) => {
    if (!req.isAuthenticated()) {
        res.redirect('/')
    } else if (req.isAuthenticated() && req.user && req.user.admin) {
        res.redirect('/admin')
    } else {
        next()
    }
}
let apiAuth = (req, res, next) => {
    if (req.isAuthenticated() && req.user.admin) {
        next()
    } else {
        res.status(401).json({ error: 'no autorizado!' })
    }
}

module.exports = {
    webAuth,
    auth,
    apiAuth,
    homeAuth
}