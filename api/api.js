const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");


const googlepassword = 'kwaxuemkjcnzpepi';

const transporter = nodemailer.createTransport(
    {
        service: 'gmail',
        auth: {
            user: 'akprokokelvin@gmail.com',
            pass: googlepassword,
        }
    }
);

const verifyEmailOtp = (email, firstName, otp) => {
    const mailOptions = {
        from: 'akprokokelvin@gmail.com',
        to: email,
        subject: "Verify Your Email",
        html: `
        <html>

        <h2>Hello ${firstName},</h2>
        <p>Your email verification OTP is <b>${otp}<b></p>
        
        </html>
        
        `
    }

    return transporter.sendMail(mailOptions);
}

let users = [];
let emailVerificationOtps = [];

router.get('/users', (req, res) => {
    res.status(200).json(users);
})

router.post('/register', async (req, res) => {
    const {firstName, lastName, email, password} = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashedPassword,
        isVerified: false
    }

    const otp  = Math.floor(100000 + Math.random() * 900000)

    const newOtp = {
        otp: otp,
        email: email,
        isVerified: false
    }

    if (!firstName || !lastName || !email || !password) {
        res.status(400).json({message: 'All fields are required'})
    } else {
        const user = users.find(user => user.email === email);
        if (!user) {
        try {
            const emailStatus = await verifyEmailOtp(email, firstName, otp);
            console.log(emailStatus);
            if (emailStatus.accepted.length > 0) {
                users.push(newUser);
                emailVerificationOtps.push(newOtp);
                console.log(emailStatus)
                res.status(201).json({message: 'An OTP has been sent to your email', user: newUser})
            }
        } catch(error){
            console.log(error)
        }
        } else {
        res.status(409).json({message: 'email already exists'});
        }
    }

    
})

router.post("/verify-email-otp", async (req, res) => {
    const sentOtp = req.body.otp;
    const intOtp = parseInt(sentOtp, 10);

    const existingOtp = emailVerificationOtps.find(otp => otp.otp === intOtp);
    if (existingOtp && existingOtp.isVerified === false) {
        existingOtp.isVerified = true;
        const user = users.find(user => user.email === existingOtp.email);
        if (user) {
            user.isVerified = true;
            res.status(200).json({message: 'Email has been verified'})
        }
        
    } else if (existingOtp && existingOtp.isVerified === true) {
        res.status(409).json({message: 'OTP has been used'})
    } else {
        res.status(400).json({message: 'Invalid OTP'})
    }
})


module.exports = router;