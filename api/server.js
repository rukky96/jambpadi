const express = require('express');
const path = require("path");
const app = express();
const router = require("./api");
const user = require('./user_routes');

const port =  process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use('/api', router);

app.use(express.static(path.join(__dirname, "/../public")))

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, "/../public", 'login.html'));
})

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, "/../public", 'register.html'));
})

app.get('/password-reset-email', (req, res, next) => {
    res.sendFile(path.join(__dirname, '/../public', 'password_reset_email.html'))
})

app.get('/verify-email-otp', (req, res)=>{
    res.sendFile(path.join(__dirname, "/../public", 'verify_email_otp.html'));
})

app.get('/reset-password-otp', (req, res)=>{
    res.sendFile(path.join(__dirname, "/../public", 'reset_password_otp.html'));
})

app.get('/reset-password', (req, res)=>{
    res.sendFile(path.join(__dirname, "/../public", 'password_reset.html'));
})

app.get('', (req, res)=>{
    res.sendFile(path.join(__dirname, "/../public", 'homepage.html'));
})

app.get('/user/dashboard/test', (req, res)=>{
    res.sendFile(path.join(__dirname, "/../public", 'test.html'));
})

app.get('/pricing', (req, res)=>{
    res.sendFile(path.join(__dirname, "/../public", 'pricing.html'));
})

app.get('/enterprise', (req, res)=>{
    res.sendFile(path.join(__dirname, "/../public", 'enterprise.html'));
})


app.use('/user', user)




app.listen(port, () => {
    console.log("Server is running");
})

module.exports = app;