const express = require("express");
const sgMail = require("@sendgrid/mail");
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require("cors");
require("dotenv").config();

//initialize express.json middleware(body-parser equivilant)
app.use(express.json());

//initialize cors middleware
app.use(cors());

app.get("/", (req, res) => {
  res.send("Home Route");
});

// route for sending email to clients
app.post("/email", (req, res) => {
  const { name, clientEmail, subject, message } = req.body;
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: "info@romaric.dev", // Change to your recipient
    from: "admin@romaric.dev", // Change to your verified sender
    subject: `New romaric.dev request from ${name} at ${clientEmail}`,
    text: `New Dev request from ${name} from email: ${clientEmail}`,
    html: `<div><strong>Name:</strong><p>${name}</p><strong>Email:</strong><p>${clientEmail}</p><strong>Subject:</strong><p>${subject}</p><strong>Message:</strong><p>${message}</p></div>`,
  };
  sgMail
    .send(msg)
    .then(() => {
      res.send("email sent");
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
});

app.listen(PORT, () => {
  console.log(`app listening on port: ${PORT}`);
});
