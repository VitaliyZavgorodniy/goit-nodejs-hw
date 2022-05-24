const sgMail = require("@sendgrid/mail");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

const verificationEmail = require("../emailTemplates/verificationEmail");

const { SENDGRID_MAIL_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_MAIL_API_KEY);

const sendConfirmEmail = async (email) => {
  const verificationToken = uuidv4();

  const { subject, html } = verificationEmail({ email, verificationToken });

  const msg = {
    from: "vince.kkr@gmail.com",
    to: email,
    subject,
    html,
  };

  const result = await sgMail.send(msg);

  return verificationToken;
};

module.exports = sendConfirmEmail;
