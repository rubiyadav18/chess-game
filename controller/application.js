const bookidgen = require("bookidgen");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const config = require("../config");
const User = require("../model/users");
const Tournament = require("../model/tournament");
const Contact = require("../model/contactus");
const bcrypt = require("bcrypt");
const Subscription = require("../model/subscription");
const SubscriptionRefund = require("../model/subscription_refund");
const Wallet = require("../model/wallet");
const Complaint = require("../model/complaint");
const Profile = require("../model/profile");
const Game = require("../model/game");

// post for signup
const signUp = async (req, res) => {
  let { userName, password, conformPassword, email, skillLevel } = req.body;
  try {
    if (!userName || !password || !conformPassword || !email || !skillLevel) {
      res.json({ message: "Enter all data", status: false });
    } else {
      if (password != conformPassword) {
        res.json({ message: "Check your password", status: false });
      } else {
        const hashpwd = bcrypt.hashSync(password, 10);
        let id = bookidgen("USER", 99999, 999999);

        const user = await User.create({
          userName,
          id,
          password: hashpwd,
          email,
          skillLevel,
        });
        if (user) {
          res.json({ message: "user saved succesfully", status: true });
        } else {
          res.json({ message: "user not saved", status: false });
        }
      }
    }
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};

// post for login
const login = async (req, res) => {
  let { userName, password } = req.body;
  try {
    if (!userName || !password) {
      res.json({ message: "enter all data", status: false });
    } else {
      const users = await User.findOne({ userName: userName });
      if (!users) {
        res.json({
          msg: "User doesn't exist",
        });
      } else {
        if (users.blocked === false) {
          let token = await jwt.sign(
            {
              id: users.id,
            },
            config.JWT_TOKEN_KEY
          );
          users.token = token;
          var compare = bcrypt.compareSync(password, users.password);
          if (compare === false) {
            res.json({
              message: "Invalid UserName/password",
              status: false,
            });
          } else {
            res.json({
              message: "login success",
              token,
              status: true,
            });
          }
        } else {
          res.json({ message: "User cannot login", status: false });
        }
      }
    }
  } catch (err) {
    res.json({ message: err.message, status: false });
  }
};

//Post Profile
const postProfile = async (req, res) => {
  const { description, pic, name, country } = req.body;
  try {
    const user = await User.findOne({ id: req.body.id });
    if (!description || !pic || !name || !country) {
      res.json({ message: "Enter all data", status: false });
    } else {
      const profile = await Profile.create({
        id: user.id,
        pic,
        name,
        userName: user.userName,
        password: user.password,
        country,
        description,
        skillLevel: user.skillLevel,
      });
      res.json({ message: "Profile is created", status: true });
    }
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};

//Get Profile
const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ id: req.params.id });
    if (!profile) {
      res.json({ message: "User is not found", status: false });
    } else {
      res.json({ message: "User is found", data: profile, status: true });
    }
  } catch (error) {
    res.json({ message: err.message, status: false });
  }
};

//Patch Profile
const patchProfile = async (req, res) => {
  const { name, userName, country, description, pic, skillLevel } = req.body;
  try {
    if (!description || !pic || !name || !country || !userName || !skillLevel) {
      res.json({ message: "Enter all data", status: false });
    } else {
      const profile = await Profile.findOneAndUpdate(
        { id: req.params.id },
        {
          name,
          userName,
          country,
          description,
          pic,
          skillLevel,
        },
        { new: true }
      );
      if (!profile) {
        res.json({ message: "User is not found", status: false });
      } else {
        res.json({ message: "User updated successfully", status: true });
      }
    }
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};

//Get leaderboard
const leaderBoard = async (req, res) => {
  try {
    const leader = await User.find({}).select(
      "rank name country matches.won matches.lost matches.draw"
    );
    res.json({ message: "LeaderBoard", data: leader, status: true });
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};

//Get Tournaments
const getTournament = async (req, res) => {
  try {
    const tournament = await Tournament.find({});
    res.json({
      message: "Tournaments are found",
      data: tournament,
      status: true,
    });
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};

// get all subscription data
const getAllSubscription = async (req, res) => {
  try {
    const dataSubscription = await Subscription.find({});
    res.json({ message: "get all data", data: dataSubscription, status: true });
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};

// Get by id subscription data
const getSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findOne({ id: req.params.id });
    if (!subscription) {
      res.json({ message: "enter correct id", status: false });
    } else {
      res.json({
        message: "the data is found",
        data: subscription,
        status: true,
      });
    }
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};

//Post Subcription
const postSubscription = async (req, res) => {
  const { name } = req.body;
  try {
    const plan = await Subscription.findOne({ name });

    const name = plan.name;
    const img = plan.img;
    const description = plan.description;
    const price = plan.price;
    const noOfTourna = plan.noOfTourna;

    const user = await User.findOneAndUpdate(
      { id: req.body.id },
      {
        $push: {
          subscription: {
            name,
            img,
            description,
            price,
            noOfTourna,
          },
        },
      },
      { new: true }
    );
    res.json({ user });
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};

// post contact data
const postcontact = async (req, res) => {
  let { description } = req.body;
  try {
    const contact = await Contact.create({
      userId: req.params.id,
      description,
    });
    if (!contact) {
      res.json({ message: "enter correct id", status: false });
    } else {
      res.json({ message: "data add successful", status: true });
    }
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};

// get users data by id
const getUsers = async (req, res) => {
  try {
    const user = await User.find({ id: req.params.id });
    res.json({ message: "get all data", data: user, status: true });
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};

// post subscriptionRefund
const subscriptionRefund = async (req, res) => {
  let { reason } = req.body;
  try {
    const getSubscriptionPlan = await User.findOne({
      id: req.body.userId,
    }).select("subscription");

    if (!getSubscriptionPlan) {
      res.json({ message: "enter the correct id", status: false });
    } else {
      const plan = getSubscriptionPlan.subscription;
      const id = bookidgen("RDN", 4567, 345678);
      const refund = await SubscriptionRefund.create({
        id,
        userId: req.body.userId,
        plan,
        reason,
      });
      if (refund) {
        res.json({ message: "refund data", data: refund, status: true });
      } else {
        res.json({ message: "refund data is not created", status: false });
      }
    }
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};

// Get by id for subscription_refund
const getSubscriptionRefund = async (req, res) => {
  try {
    const refund = await SubscriptionRefund.find({ id: req.params.id });
    if (!refund) {
      res.json({ message: "enter the correct id" });
    } else {
      res.json({ message: "get data", data: refund, status: true });
    }
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};

// post wallet
// const postWallet = async (req, res) => {
//   let { recharge, payment, result } = req.body;
//   try {
//     const walletBalance = await User.find({ id: req.params.id });
//     console.log(walletBalance.wallet);
//     const id = bookidgen("WR", 99999, 999999);
//     var balance = parseInt(walletBalance.wallet);
//     console.log(balance);
//     const wallet = await Wallet.create({
//       id,
//       balance,
//       recharge,
//       payment,
//       result,
//     });
//     const tranHistory = await User.findOneAndUpdate(
//       { id: req.params.id },
//       {
//         $push: {
//           paymentHistory: {
//             id: bookidgen("TRAN", 9999, 99999),
//             date: moment().format("dd.MM.yyyy"),
//             payment,
//             amount: recharge,
//             result,
//           },
//         },
//       },
//       { new: true }
//     );
//     const balanceStatus = await Wallet.findOne({ id: wallet.id });

//     if (balanceStatus.result === "success") {
//       var Recharge = parseInt(recharge);
//       balance = balance + Recharge;
//     }
//     const update = await User.findOneAndUpdate(
//       { id: req.params.id },
//       { wallet: balance },
//       { new: true }
//     );
//     res.json({
//       message: "check your balance amount",
//       data: wallet,
//       status: true,
//     });
//   } catch (error) {
//     res.json({ message: error.message, status: false });
//   }
// };

// post wallet
const postWallet = async (req, res) => {
  let { recharge, payment, result } = req.body;
  try {
    const walletBalance = await User.findOne({ id: req.params.id });
    console.log(walletBalance.wallet);
    const id = bookidgen("WR", 99999, 999999);
    var balance = parseInt(walletBalance.wallet);
    console.log(balance);
    const wallet = await Wallet.create({
      id,
      balance,
      recharge,
      payment,
      result,
    });
    const tranHistory = await User.findOneAndUpdate(
      { id: req.params.id },
      {
        $push: {
          paymentHistory: {
            id: bookidgen("TRAN", 9999, 99999),
            date: moment().format("dd.MM.yyyy"),
            payment,
            amount: recharge,
            result,
          },
        },
      },
      { new: true }
    );
    const balanceStatus = await Wallet.findOne({ id: wallet.id });

    if (balanceStatus.result === "success") {
      var Recharge = parseInt(recharge);
      balance = balance + Recharge;
    }
    const update = await User.findOneAndUpdate(
      { id: req.params.id },
      { wallet: balance },
      { new: true }
    );
    res.json({
      message: "check your balance amount",
      data: wallet,
      status: true,
    });
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};

// Get wallet status
const getStatus = async (req, res) => {
  try {
    const balanceStatus = await Wallet.findOne({ id: req.params.id });
    console.log(balanceStatus);
    if (!balanceStatus) {
      res.json({ message: "check the id", status: false });
    } else {
      res.json({
        message: "your wallet",
        data: balanceStatus,
        status: false,
      });
    }
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};

//Get Payment History
const getPaymentHistory = async (req, res) => {
  try {
    const paymentHistory = await User.findOne({ id: req.params.id }).select(
      "paymentHistory"
    );
    if (!paymentHistory) {
      res.json({ message: "Check your id", status: false });
    } else {
      res.json({
        message: "Payment History",
        data: paymentHistory,
        status: true,
      });
    }
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};

// post for complaint
const complaint = async (req, res) => {
  let { complaint } = req.body;
  try {
    const user = await User.findOne({ id: req.body.id });
    for (i in user.paymentHistory) {
      if (user.paymentHistory[i].id == req.params.id) {
        const transaction = user.paymentHistory[i];
        const complaints = await Complaint.create({
          complaint,
          tranId: transaction.id,
          date: transaction.date,
          amount: transaction.amount,
          payment: transaction.payment,
          result: transaction.result,
          id: bookidgen("CPT", 9999, 99999),
        });
        res.json({
          message: "your complaint is recorded",
          complaints,
          status: true,
        });
      }
    }
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};

//Game post api 
const postGame = async (req, res) => {
  try {
    const games = await Game.find({});
    console.log(games);

    if (!games.length) {
      const newGame = await Game.create({
        id: bookidgen("GAME", 9999, 999999),
      });
      const game = await Game.findOneAndUpdate(
        
        { id: newGame.id },
        {

          $push: {
            players: { id: req.body.id },

          },
        },
        { new: true }
      );
      res.json({
        message: "You joined a game",
        data: game,
        status: true,
      });
    } else {
      let count = 0;
      let a;
      for (let i = 0; i < games.length; i++) {
        if (games[i].players.length < 4) {
          count = 1;
          a = games[i];
          break;
        }
      }
      if (count == 1) {
        const newGame = await Game.findOneAndUpdate(
          { id: a.id },
          {
            $push: {
              players: { id: req.body.id },
            },
          },
          {
            new: true,
          }
        );
        res.json({
          message: "You joined a game",
          data: newGame,
          status: true,
        });
      } else {
        const newGame = await Game.create({
          id: bookidgen("GAME", 9999, 999999),
        });
        const game = await Game.findOneAndUpdate(
          { id: newGame.id },
          {
            $push: {
              players: { id: req.body.id },
            },
          },
          { new: true }
        );
        res.json({
          message: "You joined a game",
          data: game,
          status: true,
        });
      }
    }
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};



module.exports = {
  login,
  signUp,
  getProfile,
  postProfile,
  patchProfile,
  leaderBoard,
  getTournament,
  getSubscription,
  getAllSubscription,
  postcontact,
  getUsers,
  postSubscription,
  subscriptionRefund,
  getSubscriptionRefund,
  postWallet,
  getStatus,
  getPaymentHistory,
  complaint,
  postGame,
};
