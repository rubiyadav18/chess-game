const express = require("express");
const application = require("../controller/application");

const router = express.Router();

// Post api of login
router.post("/post/login", application.login);

//Sign Up
router.post("/post/signup", application.signUp);

//Profile
//Post
router.post("/post/profile", application.postProfile);
//Get
router.get("/get/profile/:id", application.getProfile);
//Patch
router.patch("/patch/profile/:id", application.patchProfile);

// Post contact us
router.post("/add/contactus/:id", application.postcontact);

//Get leaderboard
router.get("/get/leaderboard", application.leaderBoard);

//Get Tournament
router.get("/get/tournament", application.getTournament);

// Subscription
// getall api for subscription
router.get("/get/all/subscription", application.getAllSubscription);
// get by id for subscription
router.get("/get/subscription/:id", application.getSubscription);
//Post
router.post("/post/sub", application.postSubscription);

// Subscription_Refund
// post
router.post("/post/refund", application.subscriptionRefund);
// Get
router.get("/get/refund/:id", application.getSubscriptionRefund);

// wallet
// post for recharge
router.post("/post/wallet/:id", application.postWallet);
// get recharge status
router.get("/get/status/:id", application.getStatus);

//Payment History
//Get
router.get("/get/paymenthistory/:id", application.getPaymentHistory);

// complaint
// post
router.post("/post/complaint/:id", application.complaint);

//Game
router.post("/post/game", application.postGame);

// user
// get
router.get("/get/user/:id", application.getUsers);

module.exports = router;



