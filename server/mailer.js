const nodemailer = require('nodemailer');
 
// Nodemailer configuration
const transporter = nodemailer.createTransport({
  service: 'outlook',
        auth: {
          user: 'keerthanap@jmangroup.com',
          pass: 'Jman@600113'
        }
});
 
// Function to send email
const sendEmail = async (to, subject, text) => {
  try {
    const mailOptions = {
      from: 'keerthanap@jmangroup.com',
      to: to,
      subject: subject,
      text: text
    };  
 
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
};
 
module.exports = sendEmail;