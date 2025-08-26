const nodemailer = require("nodemailer");
require("dotenv").config();

exports.subscribe = async (req, res) => {
  const { email } = req.body; // 👈 email from Postman frontend

  if (!email) {
    return res.status(400).json({ success: false, message: "Email is required" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // sender (you)
        pass: process.env.EMAIL_PASS,
      },
    });
    console.log("Sending to:", email);

    const mailOptions = {
      from: `"My Article Platform" <${process.env.EMAIL_USER}>`, // sender
      to: email, // 👈 THIS must be saadcr7... (the subscriber)
      subject: "Welcome to our Newsletter 🎉",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.5;">
          <h2>Welcome to My Article Platform 🚀</h2>
          <p>Hello <b>${email}</b>,</p>
          <p>We’re excited to have you onboard. You’ll now get the latest articles, updates, and exclusive content straight to your inbox.</p>
          <p style="margin-top:10px;">Stay tuned, and happy reading! 📚</p>
          <br>
          <p>— The My Article Platform Team</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("Message sent:", info.response);

    res.status(200).json({
      success: true,
      message: `Subscription successful! A welcome email has been sent to ${email}`,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ success: false, message: "Failed to send email" });
  }
};
