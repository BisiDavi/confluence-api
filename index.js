const express = require("express");
const googleCalendar = require("./api/gc");

const app = express();

app.use(express.json({ extended: false }));
app.use("/api/gc", googleCalendar);
app.get("/", (req, res) => {
  res.send("Hello World");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
