module.exports.authenticate = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('error_msg', 'You must login!');
    return res.redirect('/users/login');
}