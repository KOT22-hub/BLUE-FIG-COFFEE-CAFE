require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Create transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "munatsi272@gmail.com", // Your Gmail
    pass: "ducx vwho rxqv stae", // Your App Password
  },
});

app.post("/home.html", (req, res) => {
  const { name, phone, Email, Date, Time, Seats, Requests } = req.body;

  const mailOptions = {
    from: Email,
    to: process.env.RECIPIENT_EMAIL, // Your email
    subject: `Booking made by ${name}`,
    text: `Name: ${name}\nPhone: ${phone}\nDate: ${Date}\nTime: ${Time}\nSeats: ${Seats}\n Special Requests: ${Requests}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(200).json({ message: "Table Booking made successfully!" });
  });
});
app.post("/reservation.html", (req, res) => {
  const { name, phone, Email, Date, Time, Seats, Requests } = req.body;

  const mailOptions = {
    from: Email,
    to: process.env.RECIPIENT_EMAIL, // Your email
    subject: `Reservation made by ${name}`,
    text: `Name: ${name}\nPhone: ${phone}\nDate: ${Date}\nTime: ${Time}\nSeats: ${Seats}\n Special Requests: ${Requests}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(200).json({ message: "Table reservation made successfully!" });
  });
});
app.post("/Events.html", (req, res) => {
  const {
    name,
    phone,
    Email,
    Date,
    Time,
    Occasions,
    Theme,
    numberofChildren,
    numberofAdult,
    Requests,
  } = req.body;

  const mailOptions = {
    from: Email,
    to: process.env.RECIPIENT_EMAIL, // Your email
    subject: `Event made by ${name}`,
    text: `Name: ${name}\nPhone: ${phone}\nDate: ${Date}\nTime: ${Time}\n ${Requests}\n Occasion:${Occasions}\n Theme:${Theme}\n Number of Children: ${numberofChildren} \n Number of adults: ${numberofAdult}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(200).json({ message: "Event reservation made successfully!" });
  });
});
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
