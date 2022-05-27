const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema(
  {
    players: { type: Array, default: [] },
    id: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("game", gameSchema);
