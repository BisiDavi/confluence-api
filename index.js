const express = require("express");
const cors = require("cors");
const dotEnv = require("dotenv");
const googleCalendar = require("./api/gc");

const app = express();
dotEnv.config();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello");
});

app.use("/api/gc", googleCalendar);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

