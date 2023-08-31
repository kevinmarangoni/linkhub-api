const express = require("express");
const pingController = require("../controllers/ping");
const LinkController = require("../controllers/link");

const router = express.Router();

//ping
router.get('/ping', pingController.respondPing)

//links
router.post('/link', LinkController.createLink)
router.get('/link/short/:short', LinkController.getLinkByShort)
router.get('/link/link/:link', LinkController.getShortByLink)


module.exports = router