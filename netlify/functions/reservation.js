const nodemailer = require("nodemailer");
exports.handler = async (event) => {
  try {
    const { name, phone, Email, Date, Time, Seats, Requests } = JSON.parse(
      event.body
    );

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USERs, // Your email
        pass: process.env.EMAIL_PASSs, // Your email app password
      },
    });

    let mailOptions = {
      from: Email, // Sender address
      to: `${process.env.EMAIL_USERs}, ${process.env.EMAIL_USER}`, // Recipient address
      subject: `New Reservation Form From: ${name}`, // Email subject
      html: `
           <h3>New Reservation Booking Form </h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${Email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Date:</strong> ${Date}</p>
        <p><strong>Time:</strong> ${Time}</p>
        <p><strong>Seats:</strong> ${Seats}</p>
        <p><strong>Requests</strong> ${Requests}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Email sent successfully!" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
