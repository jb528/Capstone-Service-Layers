var express = require('express');
var router = express.Router();

router.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.errors = req.flash("error");
    res.locals.infos = req.flash("info");
    next();

});

router.use("/", require("./home"));
router.use("/profile", require("./profile"));


module.exports = router;