const express = require("express");
const pingController = require("../controllers/ping");
const LinkController = require("../controllers/link");
const TreeController = require("../controllers/tree");

const router = express.Router();

//ping
router.get('/ping', pingController.respondPing)

//links
router.post('/link', LinkController.createLink)
router.get('/link/short/:short', LinkController.getLinkByShort)
router.get('/link/link/:link', LinkController.getShortByLink)

// trees
router.post('/tree', TreeController.createTree);
router.get('/tree/:treeId', TreeController.getTreeById);
router.put('/tree/:treeId', TreeController.updateTree);
router.delete('/tree/:treeId', TreeController.softDeleteTree);

router.get('/tree/owner/:owner', TreeController.getTreesByOwner);


module.exports = router