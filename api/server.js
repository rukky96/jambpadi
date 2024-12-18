const express = require('express');
const path = require("path");
const app = express();
const router = require("./api");
const dotenv = require("dotenv");
dotenv.config();

const port =  process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use('/api', router);

app.use(express.static(path.join(__dirname, "../public")))

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, "../public", 'login.html'));
})

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, "../public", 'register.html'));
})

app.get('/password-reset-email', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../public', 'password_reset_email.html'))
})

app.get('/verify-email-otp', (req, res)=>{
    res.sendFile(path.join(__dirname, "../public", 'verify_email_otp.html'));
})

app.get('/reset-password-otp', (req, res)=>{
    res.sendFile(path.join(__dirname, "../public", 'reset_password_otp.html'));
})

app.get('/reset-password', (req, res)=>{
    res.sendFile(path.join(__dirname, "../public", 'password_reset.html'));
})

app.get('', (req, res)=>{
    res.sendFile(path.join(__dirname, "../public", 'homepage.html'));
})

app.get('/user/dashboard/test', (req, res)=>{
    res.sendFile(path.join(__dirname, "../public", 'test.html'));
})

app.get('/pricing', (req, res)=>{
    res.sendFile(path.join(__dirname, "../public", 'pricing.html'));
})

app.get('/enterprise', (req, res)=>{
    res.sendFile(path.join(__dirname, "../public", 'enterprise.html'));
})

app.get('/user/dashboard', (req, res)=>{
    res.sendFile(path.join(__dirname, "../public", 'user_dashboard.html'));
})

app.get('/enterprise/login', (req, res)=>{
    res.sendFile(path.join(__dirname, "../public", 'enterprise_login.html'));
})

app.get('/blogs', (req, res)=>{
    res.sendFile(path.join(__dirname, "../public", 'blogs.html'));
})

app.get('/about', (req, res)=>{
    res.sendFile(path.join(__dirname, "../public", 'about.html'));
})

app.get('/api-reference', (req, res)=>{
    res.sendFile(path.join(__dirname, "../public", 'api_reference.html'));
})


app.listen(port, () => {
    console.log("Server is running");
})

module.exports = app;