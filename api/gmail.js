const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();

router.post("/mail/send", (req, res) => {
  async function sendEmail() {
    const mailOptions = {
      from: "oludavidconnect@gmail.com",
      to: req.body.receipent,
      subject: `This is to notify you about the upcoming meeting - ${req.body.title}`,
    };
    try {
      const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: "oludavidconnect@gmail.com",
          clientID: process.env.GMAIL_CLIENT_ID,
          clientSecret: process.env.GMAIL_CLIENT_SECRET,
          accessToken,
        },
      });
    } catch (error) {
      console.log("send-email-error", error);
    }
  }
});
