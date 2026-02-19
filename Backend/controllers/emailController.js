import transporter from "../config/mailer.js";

export const sendEmail = async (req, res) => {
    const email = "dozzydivinec@gmail.com";
    try {
        await transporter.sendMail({
  from: `"My App" <${process.env.emailUser}>`,
  to: email,
  subject: "Welcome to My App 🎉",

  html: `
  <div style="font-family: Arial, Helvetica, sans-serif; background-color:#f4f6f8; padding:40px 0;">
    
    <table align="center" width="100%" style="max-width:600px; background:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.08);">
      
      <!-- Header -->
      <tr>
        <td style="background:#4f46e5; padding:25px; text-align:center;">
          <h1 style="color:white; margin:0;">My App</h1>
          <p style="color:#e0e7ff; margin:5px 0 0;">Welcome aboard 🚀</p>
        </td>
      </tr>

      <!-- Body -->
      <tr>
        <td style="padding:35px;">
          <h2 style="margin-top:0; color:#333;">Hi there,</h2>

          <p style="color:#555; line-height:1.6;">
            Thank you for registering with <strong>My App</strong>.  
            Your account has been created successfully and you're ready to get started.
          </p>

          <p style="color:#555; line-height:1.6;">
            Click the button below to log in and explore all the features we built just for you.
          </p>

          <!-- Button -->
          <div style="text-align:center; margin:30px 0;">
            <a href="http://localhost:5173/login"
              style="background:#4f46e5; color:white; padding:12px 28px; text-decoration:none; border-radius:6px; font-weight:bold;">
              Login to Your Account
            </a>
          </div>

          <p style="color:#777; font-size:14px;">
            If you did not create this account, please ignore this email.
          </p>
        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="background:#f9fafb; padding:20px; text-align:center; font-size:12px; color:#888;">
          © ${new Date().getFullYear()} My App. All rights reserved. <br/>
          Need help? Contact support anytime.
        </td>
      </tr>

    </table>
  </div>
  `
});
       res.status(200).json({Message: "Email sent successfully"});

    } catch (error) {
        
    res.status(500).json({Message: "Error sending email", error: error.message});
    }
};