const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const passwordResetTemplate = (url) => {
  return `<!DOCTYPE html>
	  <html>
	  
	  <head>
		  <meta charset="UTF-8">
		  <title>Password Reset</title>
		  <style>
			  body {
				  background-color: #f4f4f4;
				  font-family: 'Arial', sans-serif;
				  font-size: 16px;
				  line-height: 1.6;
				  color: #333333;
				  margin: 0;
				  padding: 0;
			  }
	  
			  .container {
				  max-width: 600px;
				  margin: 0 auto;
				  padding: 30px;
				  text-align: center;
				  background-color: #ffffff;
				  border: 1px solid #e0e0e0;
				  border-radius: 5px;
			  }
	  
			  .logo {
				  max-width: 200px;
				  margin-bottom: 20px;
			  }
	  
			  .message {
				  font-size: 24px;
				  font-weight: bold;
				  margin-bottom: 20px;
			  }
	  
			  .body {
				  font-size: 18px;
				  margin-bottom: 20px;
			  }
	  
			  .cta {
				  display: inline-block;
				  padding: 12px 24px;
				  background-color: #007bff;
				  color: #ffffff;
				  text-decoration: none;
				  border-radius: 5px;
				  font-size: 18px;
				  font-weight: bold;
				  margin-top: 20px;
			  }
	  
			  .support {
				  font-size: 14px;
				  color: #999999;
				  margin-top: 20px;
			  }
	  
			  .highlight {
				  font-weight: bold;
				  color: #007bff;
			  }
		  </style>
	  
	  </head>
	  
	  <body>
		  <div class="container">
			  <a href="https://code-infinity.vercel.app"><img class="logo"
					  src="https://i.ibb.co/RDSMk5X/mail-logo.png" alt="CodeInfinity Logo"></a>
			  <div class="message">Password Reset</div>
			  <div class="body">
				  <p>Dear User,</p>
				  <p>We received a request to reset your password. To proceed with the password reset, please click the
					  link below:</p>
				  <a href="${url}" class="cta">Reset Password</a>
				  <p>If you did not request this password reset, you can safely ignore this email; your account is secure.</p>
				  <p>Please note that this link is valid for a limited time. If you continue to experience issues or need
					  further assistance, please contact our support team.</p>
			  </div>
			  <div class="support">If you have any questions or need assistance, please feel free to reach out to us at <a
					  href="mailto:ankitjaat24u@gmail.com">ankitjaat24u@gmail.com</a>. We are here to help!</div>
		  </div>
	  </body>
	  
	  </html>`;
};
exports.resetPasswordToken = async (req, res) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.json({
        success: false,
        message: `This Email: ${email} is not Registered With Us Enter a Valid Email `,
      });
    }
    const token = crypto.randomBytes(20).toString("hex");

    const updatedDetails = await User.findOneAndUpdate(
      { email: email },
      {
        token: token,
        resetPasswordExpires: Date.now() + 3600000,
      },
      { new: true }
    );
    console.log("DETAILS", updatedDetails);

    const url = `https://code-infinity.vercel.app/update-password/${token}`;

    await mailSender(
      email,
      "Password Reset",
      passwordResetTemplate(url)
      //   `Your Link for email verification is ${url}. Please click this url to reset your password.`
    );

    res.json({
      success: true,
      message:
        "Email Sent Successfully, Please Check Your Email to Continue Further",
    });
  } catch (error) {
    return res.json({
      error: error.message,
      success: false,
      message: `Some Error in Sending the Reset Message`,
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { password, confirmPassword, token } = req.body;

    if (confirmPassword !== password) {
      return res.json({
        success: false,
        message: "Password and Confirm Password Does not Match",
      });
    }
    const userDetails = await User.findOne({ token: token });
    if (!userDetails) {
      return res.json({
        success: false,
        message: "Token is Invalid",
      });
    }
    if (!(userDetails.resetPasswordExpires > Date.now())) {
      return res.status(403).json({
        success: false,
        message: `Token is Expired, Please Regenerate Your Token`,
      });
    }
    const encryptedPassword = await bcrypt.hash(password, 10);
    await User.findOneAndUpdate(
      { token: token },
      { password: encryptedPassword },
      { new: true }
    );
    res.json({
      success: true,
      message: `Password Reset Successful`,
    });
  } catch (error) {
    return res.json({
      error: error.message,
      success: false,
      message: `Some Error in Updating the Password`,
    });
  }
};
