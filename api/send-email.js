const express = require("express");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
require("dotenv").config();
const router = express.Router();

const { auth } = require("../constant");

const oAuth2Client = new google.auth.OAuth2(
  process.env.GMAIL_CLIENT_ID,
  process.env.GMAIL_CLIENT_SECRET,
  process.env.GMAIL_REDIRECT_URI
);

oAuth2Client.setCredentials({
  refresh_token: process.env.GMAIL_REFRESH_TOKEN,
});

async function sendEmail(req, res) {
  const { subject, title, message, receipent, from } = req.body;
  console.log(
    "subject, title, message, receipent, from ",
    subject,
    title,
    message,
    receipent,
    from
  );
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
      from,
      to: receipent,
      subject: `${subject} - ${title}`,
      text: message,
    };
    const result = await transport.sendMail(mailOptions);
    return res.status(200).json(result);
  } catch (error) {
    console.log("send-email-error", error);
    return res.status(400).json(error);
  }
}

router.post("/send", (req, res) => sendEmail(req, res));

module.exports = router;
