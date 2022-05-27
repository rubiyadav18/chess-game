const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    userId: { type: String },
    description: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("contactus", contactSchema);
