const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const dotenv = require('dotenv');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session')
const connectDB = require('./config/db');

const app = express();

require('./middleware/passport')(passport);

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.use(session({
    secret: 'cat',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
})

dotenv.config({ path: './config/config.env' });
const PORT = process.env.PORT || 3000;

// Connect to database
connectDB();



// Routes
const index = require('./routes/index');
const login = require('./routes/users');

app.use('/', index);
app.use('/users', login);

app.listen(PORT, console.log(`app listen on port ${PORT}`));