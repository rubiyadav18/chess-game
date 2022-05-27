const express = require("express");
const admin = require("../controller/admin");

const router = express.Router();

//Get users
router.get("/get/users", admin.getUsers);

// Get contact us
router.get("/get/contact", admin.getcontact);

// subscription
//  post subscription
router.post("/add/subscription", admin.postSubscription);
// patch subscription
router.patch("/update/subscription/:id", admin.patchSubscripion);
// delete subscription
router.delete("/delete/subscription/:id", admin.delSubscription);

//Get number of players are playing
router.get("/get/playing", admin.playMatch);

//Tournament
//Post
router.post("/post/tournament", admin.postTournament);

//Patch
router.patch("/patch/tournament/:id", admin.patchTournament);
//Delete

router.delete("/delete/tournament/:id", admin.deleteTournament);
//Get
router.get("/get/tournament", admin.getTournament);

//Game History
//Post

router.post("/post/game", admin.postGame);

// subscriptionRefund
// get
router.get("/get/refund", admin.getRefund);

// patch
router.patch("/add/refund/:id", admin.patchRefund);

// wallet
// post
// router.post("/post/wallet",admin.postWallet)
// get
router.get("/get/wallet", admin.getWalletStatus);

//Notification
//Post
router.post("/post/notification", admin.postNotification);

//Delete
router.delete("/delete/notification/:id", admin.deleteNotification);

// wallet recharge
router.get("/get/recharge", admin.getStatus);

//User Block
router.post("/post/block/:id", admin.userBlock);

module.exports = router;

