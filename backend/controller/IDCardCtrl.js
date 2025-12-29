const IDCard = require("../model/IDCard");
const asyncHandler = require("express-async-handler");

const IDCardController = {
  createIDCard: asyncHandler(async (req, res) => {
    try {
      const card = new IDCard({
        ...req.body,
        schoolLogo: req.files?.schoolLogo?.[0]?.path,
        studentPhoto: req.files?.studentPhoto?.[0]?.path,
      });

      // Check if regNo already exists
      const exists = await IDCard.findOne({ regNo: card.regNo });
      if (exists) {
        return res.status(400).json({
          message: "Registration number already exists",
          field: "regNo",
        });
      }

      await card.save();
      res.status(201).json({ success: true, message: "ID Card created" });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }),

  getIDCards: asyncHandler(async (req, res) => {
    try {
      const cards = await IDCard.find().sort({ createdAt: -1 });
      res.status(200).json({ success: true, cards });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }),
};

module.exports = IDCardController;
