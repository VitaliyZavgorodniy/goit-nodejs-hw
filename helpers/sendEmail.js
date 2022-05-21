const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_MAIL_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_MAIL_API_KEY);

const sendEmail = async ({ email, subject, html }) => {
  const msg = {
    from: "vince.kkr@gmail.com",
    to: email,
    subject,
    html,
  };

  const result = await sgMail.send(msg);

  return result;
};

module.exports = sendEmail;
