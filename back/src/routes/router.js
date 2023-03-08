const router = require("express").Router();
// const {errorHandler} = require('../middlewares/errorHandler');
const authRoutes = require("./authRoutes.js");
const chatRoutes = require("./chatRoutes");

router.use('/auth', authRoutes);
router.use('/chat', chatRoutes);

// router.use(errorHandler);

module.exports = router;
