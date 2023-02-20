const router = require("express").Router();
const {login, refresh, register} = require("../controllers/authController");
// const {celebrate} = require("celebrate")
// const {errorHandler} = require('../middlewares/authMiddlewares')
// const schemes = require('../validation/authSchemas')

router.post('/login', /*celebrate(schemes.login),*/ login);
router.post('/refresh', /*celebrate(schemes.refresh),*/refresh);
router.post('/register', /*celebrate(schemes.register),*/ register);

// router.use(errorHandler);

module.exports = router;