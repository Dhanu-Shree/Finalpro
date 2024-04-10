const nodemailer = require('nodemailer');
 
// Nodemailer configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
        auth: {
          user: 'dhanushr',
          pass: 'sececce2020'
        }
});
 
// Function to send email
const sendEmail = async (to, subject, text) => {
  try {
    const mailOptions = {
      from: 'dhanushree.g2020cce@sece.ac.in',
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