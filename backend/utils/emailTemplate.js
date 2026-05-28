const generateEmailTemplate = (otp, purpose) => {
    const title = purpose === 'verification' ? 'Verify your email address' : 'Reset your password';
    const description = purpose === 'verification' 
        ? 'Thank you for joining NoteShaala! To complete your registration, please use the verification code below.' 
        : 'We received a request to reset your NoteShaala password. Enter the following code to choose a new password.';

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #fcf9f8;
            margin: 0;
            padding: 0;
            color: #191c1e;
        }
        .container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0,173,239,0.08);
            border: 1px solid #e1e2e5;
        }
        .header {
            background-color: #fcf9f8;
            padding: 30px;
            text-align: center;
            border-bottom: 1px solid #e1e2e5;
        }
        .logo {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            margin-bottom: 10px;
            background-color: #ffffff;
            padding: 5px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.05);
        }
        .brand-name {
            font-size: 24px;
            font-weight: 700;
            color: #00658d;
            letter-spacing: 1px;
            margin: 0;
        }
        .content {
            padding: 40px 30px;
            text-align: center;
        }
        .title {
            font-size: 22px;
            font-weight: 600;
            margin-bottom: 15px;
            color: #191c1e;
        }
        .description {
            font-size: 16px;
            color: #576065;
            line-height: 1.6;
            margin-bottom: 30px;
        }
        .otp-container {
            background-color: #c6e7ff;
            border-radius: 12px;
            padding: 20px;
            margin: 0 auto 30px;
            max-width: 300px;
            border: 2px dashed #00adef;
        }
        .otp {
            font-size: 36px;
            font-weight: 800;
            letter-spacing: 8px;
            color: #001e2e;
            margin: 0;
        }
        .warning {
            font-size: 14px;
            color: #74777f;
            margin-bottom: 0;
        }
        .footer {
            background-color: #f2f4f6;
            padding: 20px;
            text-align: center;
            font-size: 13px;
            color: #74777f;
        }
        .footer p {
            margin: 5px 0;
        }
        .footer a {
            color: #00adef;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img class="logo" src="https://res.cloudinary.com/dsveodziq/image/upload/v1779966869/noteshaala_assets/email_logo.png" alt="NoteShaala Logo" />
            <h1 class="brand-name">NOTESHAALA</h1>
        </div>
        
        <div class="content">
            <h2 class="title">${title}</h2>
            <p class="description">${description}</p>
            
            <div class="otp-container">
                <p class="otp">${otp}</p>
            </div>
            
            <p class="warning">This code will expire in 10 minutes. If you didn't request this, you can safely ignore this email.</p>
        </div>
        
        <div class="footer">
            <p>Copyright © 2024, NoteShaala. All Rights Reserved.</p>
            <p>Your digital companion for academic excellence.</p>
        </div>
    </div>
</body>
</html>
    `;
};

module.exports = generateEmailTemplate;
