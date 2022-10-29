require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const router = express.Router();

const { auth } = require("../constant");

const oAuth2Client = new google.auth.OAuth2(
  process.env.GMAIL_CLIENT_ID,
  process.env.GMAIL_CLIENT_SECRET,
  process.env.GMAIL_REDIRECT_URI
);

oAuth2Client.setCredentials({
  refreshToken: process.env.GMAIL_REFRESH_TOKEN,
});

async function sendEmail(req, res) {
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        ...auth,
        accessToken,
      },
    });
    const mailOptions = {
      from: "oludavidconnect@gmail.com",
      to: req.body.receipent,
      subject: `This is to notify you about the upcoming meeting - ${req.body.title}`,
      text: req.body.message,
    };
    const result = await transport.sendMail(mailOptions);
    console.log("result", result);
    return res.status(200).json(result);
  } catch (error) {
    console.log("send-email-error", error);
    return res.status(400).json(error);
  }
}

router.post("/mail/send", (req, res) => sendEmail(req, res));

module.exports = router;
