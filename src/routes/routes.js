const express = require("express");
const Ping = require("../controllers/ping");
const Link = require("../controllers/link");
const Tree = require("../controllers/tree");
const ImageKit = require("../controllers/imagekit");
const User = require("../controllers/user"); // Importe o controlador de usuário

const router = express.Router();

// ping
router.get('/ping', Ping.respondPing);

//links
router.post('/link', Link.createLink);
router.get('/link/short/:short', Link.getLinkByShort);
router.get('/link/link/:link', Link.getShortByLink);

// trees
router.post('/tree', Tree.createTree);
router.get('/tree/:treeId', Tree.getTreeById);
router.put('/tree/:treeId', Tree.updateTree);
router.delete('/tree/:treeId', Tree.softDeleteTree);
router.get('/tree/owner/:owner', Tree.getTreesByOwner);

// image
router.get('/imagekit/auth', ImageKit.getImagekitAuthParams);

// Usuários
router.get('/user/:userId', User.getUserById);
router.get('/user/email/:email', User.getUserByEmail);
router.get('/user/active', User.getAllActiveUsers);
router.get('/user/inactive', User.getInactiveUsers);
router.get('/user/all', User.getAllUsers);
router.post('/user/OAuthLogin', User.handleUserOAuthLogin);

module.exports = router;