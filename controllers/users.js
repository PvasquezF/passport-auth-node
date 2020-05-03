const User = require('../model/User');
const passport = require('passport');

module.exports.getRegister = (req, res) => {
    res.render('register');
}

module.exports.getLogin = (req, res) => {
    res.render('login');
}

module.exports.register = async(req, res) => {
    const errors = [];
    const { name, email, password, confirmpassword } = req.body;

    if (!name) {
        errors.push('Name is required!');
    }
    if (!email) {
        errors.push('Email is required!');
    }
    if (!password) {
        errors.push('Password is required!');
    }
    if (!confirmpassword) {
        errors.push('Confirm password is required!');
    }
    console.log(errors);
    if (errors.length > 0) {
        return res.render('register', {
            errors,
            name,
            email,
            password,
            confirmpassword,
            success_msg: ''
        });
        // return res.status(400).json({
        //     success: false,
        //     errors
        // });
    }

    if (password !== confirmpassword) {
        errors.push("Passwords do not match!");
        return res.render('register', {
            errors,
            name,
            email,
            password,
            confirmpassword,
            success_msg: ''
        });
        //return res.status(422).json({
        //    success: false,
        //    errors: ["Passwords do not match!"]
        //});
    }

    if (password.length !== 6) {
        errors.push("Passwords should be at least 6 characters");
        return res.render('register', {
            errors,
            name,
            email,
            password,
            confirmpassword,
            success_msg: ''
        });
        // return res.status(422).json({
        //     success: false,
        //     errors: ["Passwords should be at least 6 characters"]
        // });
    }

    let user = await User.findOne({ email });
    if (user) {
        errors.push("Email already exists");
        return res.render('register', {
            errors,
            name,
            email,
            password,
            confirmpassword,
            success_msg: ''
        });
    }
    user = User.create({ name, email, password });
    req.flash('success_msg', 'Te has registrado!');
    return res.redirect('/users/login');
    //return res.status(200).json({ success: true, data: user })
};

module.exports.login = async(req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
}
module.exports.logout = async(req, res, next) => {
    req.logout();
    req.flash('success_msg', 'Cerraste sesión');
    res.redirect('/users/login');
}