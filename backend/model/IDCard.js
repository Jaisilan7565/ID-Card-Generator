const mongoose = require("mongoose");

const IDCardSchema = new mongoose.Schema(
  {
    regNo: {
      type: String,
      unique: true,
      required: true,
    },
    schoolName: {
      type: String,
      required: true,
    },
    studentName: {
      type: String,
      required: true,
    },
    sd_of_mr: {
      type: String,
      required: true,
    },
    sd_of_mrs: {
      type: String,
      required: true,
    },
    class: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },

    schoolLogo: { type: String, required: true }, // file path
    studentPhoto: { type: String, required: true }, // file path
  },
  { timestamps: true }
);

module.exports = mongoose.model("IDCard", IDCardSchema);
