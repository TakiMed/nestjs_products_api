"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer = require("nodemailer");
const fs = require("fs");
exports.sendEmail = async () => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: true,
        port: 465,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASS,
        },
    });
    const mailOptions = {
        from: 'testninalogdts@gmail.com',
        to: 'testninalogdts@gmail.com',
        subject: 'Products report',
        html: '<p>Dear Miss/Mr/Mdm</p><p>Please find here attached daily reports from ProducstAPI</p>',
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
    }
    catch (errorko) {
        console.error('ERRRRRORRRRRRRR', errorko);
    }
};
//# sourceMappingURL=mailer.js.map