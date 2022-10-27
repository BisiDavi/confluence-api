const express = require("express");
const requestPromise = require("request-promise");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const router = express.Router();

const payload = {
  iss: process.env.ZOOM_API_KEY,
  exp: new Date().getTime() + 36000,
};

const token = jwt.sign(payload, process.env.ZOOM_API_CLIENT_SECRET);

router.post("/create-meeting", (req, res) => {
  const email = "oludavidconnect@gmail.com";
  const { topic, agenda } = req.body;
  const options = {
    method: "POST",
    uri: `https://api.zoom.us/v2/users/${email}/meetings`,
    body: {
      topic,
      agenda,
      type: 1,
      settings: {
        host_video: true,
        participant_video: true,
      },
    },
    auth: {
      bearer: token,
    },
    headers: {
      "User-Agent": "Zoom-api-Jwt-Request",
      "content-type": "application/json",
    },
    json: true,
  };

  requestPromise(options)
    .then(function (response) {
      console.log("response is: ", response);
      return res.status(200).json(response);
    })
    .catch(function (err) {
      console.log("API call failed, reason", err);
      return res.status(400).json(err);
    });
});

module.exports = router;
