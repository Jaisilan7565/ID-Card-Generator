const express = require("express");
const multer = require("multer");
const IDCardController = require("../controller/IDCardCtrl");
const IDCardRouter = express.Router();

// Storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "schoolLogo") {
      cb(null, "uploads/logos");
    } else {
      cb(null, "uploads/students");
    }
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

IDCardRouter.post(
  "/register",
  upload.fields([
    { name: "schoolLogo", maxCount: 1 },
    { name: "studentPhoto", maxCount: 1 },
  ]),
  IDCardController.createIDCard
);

IDCardRouter.get("/all", IDCardController.getIDCards);

module.exports = IDCardRouter;
