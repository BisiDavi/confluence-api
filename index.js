const express = require("express");
const googleCalendar = require("./api/gc");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello");
});

app.use("/api/gc", googleCalendar);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
