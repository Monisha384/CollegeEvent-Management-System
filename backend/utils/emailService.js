const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER || "your-email@gmail.com",
    pass: process.env.EMAIL_PASS || "your-app-password"
  }
});

const sendRegistrationEmail = async (registrationData, eventData) => {
  // Skip if we don't have real email credentials
  if (!process.env.EMAIL_USER || process.env.EMAIL_USER === "your-email@gmail.com") {
    console.log("No real email credentials found, skipping confirmation email...");
    return { success: false, error: "No credentials" };
  }

  const mailOptions = {
    from: process.env.EMAIL_USER || "College Events <your-email@gmail.com>",
    to: registrationData.email,
    subject: `✅ Registration Confirmed - ${eventData.title}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1>🎉 Registration Successful!</h1>
        </div>
        <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
          <p>Dear <strong>${registrationData.name}</strong>,</p>
          <p>Thank you for registering! Your registration has been confirmed.</p>
          
          <div style="background: white; padding: 20px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #667eea;">
            <h3>📋 Event Details</h3>
            <p><strong>Event:</strong> ${eventData.title}</p>
            <p><strong>Date:</strong> ${new Date(eventData.date).toLocaleDateString()}</p>
            <p><strong>Venue:</strong> ${eventData.venue}</p>
          </div>

          <div style="background: white; padding: 20px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #667eea;">
            <h3>💳 Payment Information</h3>
            <p><strong>Amount Paid:</strong> ₹100</p>
            <p><strong>Transaction ID:</strong> ${registrationData.transactionId || 'N/A'}</p>
          </div>

          <p>Best regards,<br><strong>College Events Team</strong></p>
        </div>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to ${registrationData.email}`);
    return { success: true };
  } catch (error) {
    console.error("❌ Email failed:", error.message);
    return { success: false, error: error.message };
  }
};

module.exports = { sendRegistrationEmail };
