const nodemailer = require('nodemailer');
require('dotenv').config();

async function test() {
    console.log("SMTP_USER:", process.env.SMTP_USER);
    console.log("SMTP_PASS length:", process.env.SMTP_PASS ? process.env.SMTP_PASS.length : 0);
    
    if (!process.env.SMTP_USER) {
        console.log("No SMTP_USER found in process.env");
        return;
    }

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp-relay.brevo.com',
        port: process.env.SMTP_PORT || 587,
        secure: process.env.SMTP_PORT == 465,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    try {
        const info = await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: process.env.SMTP_USER, // send to self for testing
            subject: 'Test Email',
            text: 'This is a test email.',
        });
        console.log("Email sent successfully!", info.messageId);
    } catch (err) {
        console.error("Failed to send email:", err.message);
    }
}

test();
