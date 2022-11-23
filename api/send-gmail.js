const { google } = require("googleapis");
const { authenticate } = require("@google-cloud/local-auth");
const express = require("express");
const router = express.Router();
const path = require("path");

const gmail = google.gmail("v1");

async function sendEmail(req, res) {
  const { to, subject, message, title } = req.body;
  const auth = await authenticate({
    keyfilePath: path.join(__dirname, "../oauth2.key.json"),
    scopes: ["https://www.googleapis.com/auth/gmail.send"],
  });
  google.options({ auth });
  const utf8Subject = `=?utf-8?B?${Buffer.from(subject).toString("base64")}?=`;

  const messageParts = [
    `From: NEAR-RESUMÉ <oludavidconnect@gmail.com>`,
    `To:${to}`,
    "Content-Type: text/html; charset=utf-8",
    "MIME-Version: 1.0",
    `Subject:${utf8Subject}`,
    "",
    title,
    message,
  ];
  const toMessagePart = messageParts.join("\n");
  const encodedMessage = Buffer.from(toMessagePart)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "-")
    .replace(/=+$/, "");

  try {
    const messageResponse = await gmail.users.messages.send({
      userId: to,
      requestBody: {
        raw: encodedMessage,
      },
    });
    console.log("messageResponse", messageResponse.data);
    return res.status(200).json(messageResponse.data);
  } catch (error) {
    console.log("error", error);
    return res.status(400).json(error);
  }
}

router.post("/mail/send", (req, res) => sendEmail(req, res));
module.exports = router;
