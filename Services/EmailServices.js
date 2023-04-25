const nodemailer = require('nodemailer');
const config = process.env

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    service: "gmail",
    auth: {
      user: config.GMAIL_ID ,
      pass: config.GMAIL_PASSWORD ,
    },
  });    
const mailOption =(user,subject,message)=> {
  return {
    from: config.GMAIL_ID,
    to: user.email,
    subject: subject,
    text: `Hi,${user.firstName}\n \t\t ${message}\n\n Regards,\n OIR Team`
  };
}

const sendContactMail=async(user,message,subject)=>{
    try{
      const info = await transporter.sendMail(mailOption(user,subject,message));
      return info.messageId;
    } catch (e) {
      return null
    }
}
module.exports = sendContactMail;