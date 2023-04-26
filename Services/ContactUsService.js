const nodemailer = require('nodemailer');
const config = process.env

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    service: "gmail",
    auth: {
      user: config.NEW_GMAIL_ID ,
      pass: config.NEW_GMAIL_PASSWORD ,
    },
  });    
const mailOption =(name,email,contact,message,subject)=> {
  return {
    from: config.NEW_GMAIL_ID,
    to: config.GMAIL_ID,
    subject: subject,
    text: `Hi,Message from : ${name}\nEmail : ${email} \n Contact : ${contact}\n Mesages: ${message}\n\n Regards,\n OIR Team`
  };
}

const sendContactMail=async(name,email,contact,message,subject)=>{
    try{
      const info = await transporter.sendMail(mailOption(name,email,contact,message,subject));
      return info.messageId;
    } catch (e) {
      return null
    }
}
module.exports = sendContactMail;