const router = require("express").Router();
// const {errorHandler} = require('../middlewares/errorHandler');
const authRoutes = require("./authRoutes.js");
// const userRoutes = require("./userRoutes");
// const postRoutes = require("./postRoutes");
// const commentRoute = require("../routes/commentRoutes");

router.use('/auth',authRoutes);
// router.use('/user',userRoutes);
// router.use('/post',postRoutes);
// router.use('/comment', commentRoute);

// router.use(errorHandler);

module.exports = router;