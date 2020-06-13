import * as nodemailer from 'nodemailer';
import * as fs from 'fs';

export const sendEmail = async () => {
  const transporter = nodemailer.createTransport({
    service: 'gmail', // hostname
    secure: true, // TLS requires secureConnection to be false
    port: 465, // port for secure SMTP
    auth: {
      user: process.env.EMAIL, // generated ethereal user
      pass: process.env.EMAIL_PASS, // generated ethereal password
    },
  });

  const mailOptions = {
    from: 'testninalogdts@gmail.com', // sender address
    to: 'testninalogdts@gmail.com', // list of receivers
    subject: 'Products report', // Subject line
    html: '<p>Dear Miss/Mr/Mdm</p><p>Please find here attached daily reports from ProducstAPI</p>', // plain text body
    attachments: [
      {
        filename: 'products.csv',
        content: fs.createReadStream('products.csv'),
      },
      {
        filename: 'dailysales.csv',
        content: fs.createReadStream('dailysales.csv'),
      },
    ],
  };

  try {
    const res = await transporter.sendMail(mailOptions);
  } catch (errorko) {
    console.error('ERRRRRORRRRRRRR', errorko);
  }
};
