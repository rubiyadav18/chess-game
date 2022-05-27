const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    id: { type: String },
    userName: { type: String },
    name: { type: String },
    email: { type: String },
    password: { type: String },
    skillLevel: { type: String },
    country: { type: String },
    playingStatus: { type: Boolean, default: false },
    score: { type: String, default: "0" },
    rank: { type: String },
    matches: {
      won: { type: String, default: "0" },
      lost: { type: String, default: "0" },
      draw: { type: String, default: "0" },
    },
    gameHistory: { type: Array, default: [] },
    onlineStatus: { type: Boolean, default: false },
    notification: { type: Array, default: [] },
    subscription: { type: Array, default: [] },
    paymentHistory: { type: Array, default: [] },
    wallet: { type: String, default: "0" },
    blocked: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", userSchema);
