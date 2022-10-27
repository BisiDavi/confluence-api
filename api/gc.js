const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("To integrate with Google Calendar");
});

module.exports = router;
