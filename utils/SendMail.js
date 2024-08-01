const nodemailer = require("nodemailer");
const ErrorHandler = require("./ErrorHandler").default;

exports.sendMail = (req,res,next,url)=>{
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host:'smtp.gmail.com',
        port: 587,
        auth: {
            user: process.env.MY_EMAIL,
            pass: process.env.APP_PASSWORD
        }
    });
    
    const mailOptions = {
        from: process.env.MY_EMAIL,
        to: req.body.email,
        subject: 'Requested for Forget-Password Link ',
        html:`
        <h1>Please click on the link to reset your password</h1>
        <a href="${url}" style="color:white; text-decoration:none; display:inline-block; border-radius:10px; font-weight:500; padding:1vw 1vw; background:royalblue;">Reset password</a>`
    }

    transporter.sendMail(mailOptions,(err,info)=>{
        if(err) return next( new ErrorHandler("Email not sent",500));
    });
}