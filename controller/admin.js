const bookidgen = require("bookidgen");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const User = require("../model/users");
const Tournament = require("../model/tournament");
const Game = require("../model/gameHistory");
const Contact = require("../model/contactus");
const Subscription = require("../model/subscription");
const Refund = require("../model/subscription_refund");
const Wallet = require("../model/wallet");
const Notify = require("../model/notification");

//Get users
const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    if (!users) {
      res.json({ message: "Users are not found", status: false });
    } else res.json({ message: "Users are found", data: users, status: true });
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};

//Get number of players playing matches
const playMatch = async (req, res) => {
  try {
    const users = await User.count({ playingStatus: true });
    res.json({
      message: `Number of players playing`,
      data: users,
      status: true,
    });
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};

//Post Tournament
const postTournament = async (req, res) => {
  const { name, time, games, prize } = req.body;
  const id = bookidgen("TRN", 99999, 999999);

  try {
    if (!name || !time || !games || !prize) {
      res.json({ message: "Enter all data", status: false });
    } else {
      const tournament = await Tournament.create({
        name,
        id,
        time,
        games,
        prize,
      });
      if (!tournament) {
        res.json({ message: "Tournament is not created", status: false });
      } else {
        res.json({ message: "Tournament is created", status: true });
      }
    }
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};

//Patch Tournament
const patchTournament = async (req, res) => {
  const { name, time, games, prize } = req.body;

  try {
    if (!name || !time || !games || !prize) {
      res.json({ message: "Enter all data", status: false });
    } else {
      const tournament = await Tournament.findOneAndUpdate(
        { id: req.params.id },
        { name, time, games, prize }
      );
      if (!tournament) {
        res.json({ message: "Check the id", status: false });
      } else {
        res.json({ message: "Updated successfully", status: true });
      }
    }
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};

//Delete Tournament
const deleteTournament = async (req, res) => {
  try {
    const tournament = await Tournament.findOneAndDelete({ id: req.params.id });

    if (!tournament) {
      res.json({ message: "Check the id", status: false });
    } else {
      res.json({ message: "Deleted successfully", status: true });
    }
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};

//Get all tournament
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

//After a classic game is finished
const postGame = async (req, res) => {
  const { name1, name2, name3, name4, result1, result2, result3, result4 } =
    req.body;
  var today = new Date();
  const date =
    today.getDate() + "." + (today.getMonth() + 1) + "." + today.getFullYear();
  const id = bookidgen("GAME", 99999, 999999);
  try {
    if (
      !name1 ||
      !name2 ||
      !name3 ||
      !name4 ||
      !result1 ||
      !result2 ||
      !result3 ||
      !result4
    ) {
      res.json({ message: "Enter all data", status: false });
    } else {
      const game = await Game.create({
        id,
        date,
        players: {
          player1: { name1, result1 },
          player2: { name2, result2 },
          player3: { name3, result3 },
          player4: { name4, result4 },
        },
      });
      res.json({ message: "Game finsihed", data: game, status: true });
    }
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};

// get contact
const getcontact = async (req, res) => {
  try {
    const contact = await Contact.find({});
    res.json({ message: "get all data", data: contact, status: true });
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};

// post subscription
const postSubscription = async (req, res) => {
  let { img, name, description, price, noOfTourna } = req.body;
  try {
    if (!img || !name || !description || !price) {
      res.json({ message: "enter all data" });
    } else {
      // const date = nowdate();
      const id = bookidgen("SUB", 45676, 345692);
      const subscription = await Subscription.create({
        id,
        img,
        name,
        description,
        price,
        noOfTourna,
      });
      res.json({
        message: "successfuly updated",
        data: subscription,
        status: true,
      });
    }
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};

// patch subscription
const patchSubscripion = async (req, res) => {
  let { img, name, description, price, noOfTourna } = req.body;
  try {
    if (!img || !name || !description || !noOfTourna) {
      res.json({ message: "enter all data" });
    } else {
      const subscription = await Subscription.findOneAndUpdate(
        { id: req.params.id },
        {
          img,
          name,
          description,
          price,
          noOfTourna,
        }
      );
      if (!subscription) {
        res.json({
          message: "enter correct id",
          status: false,
        });
      } else {
        res.json({
          message: "subscription updated successfuly",
          data: subscription,
          status: true,
        });
      }
    }
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};

// delete by id subscription
const delSubscription = async (req, res) => {
  try {
    const delsubscription = await Subscription.findOneAndDelete({
      id: req.params.id,
    });
    if (!delsubscription) {
      res.json({ message: "Enter correct id ", status: false });
    } else {
      res.json({ message: "Data deleted successfuly", status: true });
    }
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};

// get all refund
const getRefund = async (req, res) => {
  try {
    const refund = await Refund.find({});
    res.json({ message: "get all data", data: refund, status: true });
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};

// patch refund
const patchRefund = async (req, res) => {
  let { accept } = req.body;
  try {
    const refund = await Refund.findOneAndUpdate(
      { id: req.params.id },
      { accept }
    );
    if (!refund) {
      res.json({ message: "enter the correct id", status: false });
    } else {
      res.json({ message: "refund update", status: true });
    }
  } catch (error) {
    res.json({
      message: error.message,
      status: false,
    });
  }
};

// Get wallet status
const getWalletStatus = async (req, res) => {
  try {
    const balanceStatus = await Wallet.find({});
    res.json({ message: "get all data", data: balanceStatus, status: true });
  } catch (error) {
    res.json({ message: error.message, status: true });
  }
};
//Post notification
const postNotification = async (req, res) => {
  let { description } = req.body;

  try {
    let id = bookidgen("NID", 9999, 99999);

    const notification = await Notify.create({
      id,
      description,
    });

    await User.updateMany(
      {},
      {
        $push: {
          notification: {
            id,
            description,
          },
        },
      }
    );
    if (notification) {
      res.json({
        message: "Notification is created",
        data: notification,
        status: true,
      });
    } else {
      res.json({
        message: "Notification didn't create",
      });
    }
  } catch (err) {
    res.json({ message: err.message, status: false });
  }
};

//Delete notification
const deleteNotification = async (req, res) => {
  try {
    const notificationDelete = await Notificate.findOneAndDelete({
      id: req.params.id,
    });

    if (!notificationDelete) {
      res.json({
        message: "Notification Id cann't find check once",
        status: false,
      });
    } else {
      res.json({ message: "Notification deleted successfuly", status: true });
    }
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};

// Get wallet status
const getStatus = async (req, res) => {
  try {
    const balanceStatus = await Wallet.findOne({ id: req.params.id });
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
    res.json({ message: error.message, status: true });
  }
};

//Block user
const userBlock = async (req, res) => {
  try {
    const updateUser = await User.findOneAndUpdate(
      {
        id: req.params.id,
      },
      {
        blocked: req.body.blocked,
      },
      { new: true }
    );
    if (!updateUser) {
      res.json({ message: "User id is not correct", status: false });
    } else {
      res.json({ message: "User blocked successfully", status: true });
    }
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};

module.exports = {
  getUsers,
  playMatch,
  postTournament,
  patchTournament,
  deleteTournament,
  getTournament,
  postGame,
  getcontact,
  postSubscription,
  delSubscription,
  patchSubscripion,
  getRefund,
  patchRefund,
  getWalletStatus,
  postNotification,
  deleteNotification,
  getStatus,
  userBlock,
};
