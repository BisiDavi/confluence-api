const express = require("express");
const cors = require("cors");
const dotEnv = require("dotenv");

const googleCalendarRouter = require("./api/gc");
const gmailRouter = require("./api/gmail");
const sendEmailRouter = require("./api/send-email");
const zoomRouter = require("./api/zoom");

const app = express();

dotEnv.config();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello");
});

app.use("/api/gc", googleCalendarRouter);
app.use("/api/gmail", gmailRouter);
app.use("/api/send-email", sendEmailRouter);
app.use("/api/zoom", zoomRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
