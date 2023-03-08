const router = require("express").Router();
const chatControllers = require("../controllers/chatControllers");

router.get('/fetch', chatControllers.fetchController);

module.exports = router;
