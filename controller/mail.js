const nodemailer = require('nodemailer');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'medicalreporthelp@gmail.com',
        pass: process.env.MAIL_PASSWORD
    }
});

module.exports.signup_post = (req, res) => {
    const { name, email, password } = req.body;

    const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;

    const token = jwt.sign({ name, email, password }, process.env.JWT_SECRET_KEY, { expiresIn: '10m' });
    console.log(token);

    const mailOptions = {
        from: 'medicalreporthelp@gmail.com',
        to: email,
        subject: 'Account activation link',
        html:
            // `<h3>Please <a href="http://localhost:5000/api/authentication/activate/${token}">click</a> here to activate your account.
            //         `
            `<h3>Please <a href="${fullUrl}">click</a> here to activate your account.
                        `
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}