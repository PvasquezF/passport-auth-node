const express = require('express');
const { authenticate } = require('../middleware/auth')
const router = express.Router({ mergeParams: true });

router.route('/').get((req, res) => {
    res.render('welcome');
})
router.route('/dashboard').get(authenticate, (req, res) =>
    res.render('dashboard', {
        user: req.user
    })
);

module.exports = router;