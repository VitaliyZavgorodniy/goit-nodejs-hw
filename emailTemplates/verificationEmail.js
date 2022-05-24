const verificationEmail = ({ email, verificationToken }) => ({
  email,
  subject: "Confirm your email",
  html: ` 
  <p>
    <p>Link: localhost:4000/api/users/verify/${verificationToken}</p>
    <a href="localhost:4000/api/users/verify/${verificationToken}" target="_blank">
      Click for verify email
    </a>
  </p>
  `,
});

module.exports = verificationEmail;
