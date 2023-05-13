import nodemailer from "nodemailer";

const sendMail = ({
  fromEmail,
  toEmail,
  mailSubject,
  senderDetails,
  receiverDetails,
  mailBody,
}) => {
  // Create a nodemailer transporter object with the defined credentials
  const transporter = nodemailer.createTransport({
    service: process.env.NODEMAILER_SERVICE,
    auth: {
      user: process.env.NODEMAILER_AUTH_USER,
      pass: process.env.NODEMAILER_AUTH_PASS,
    },
  });
  // setup email data with unicode symbols
  const mailOptions = {
    from: fromEmail, // sender address
    to: toEmail, // list of receivers
    subject: mailSubject, // Subject line
    html: `<!DOCTYPE html>
    <html>
      <head>
        <title>Campus Placement Portal CTAE</title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body style="font-family: Arial, sans-serif; font-size: 16px; line-height: 1.5;">
        <div style="max-width: 600px; margin: 0 auto; border-width: 1px; border-style: solid; border-color: #e2e8f0; border-radius: 0.375rem; padding: 1rem;">
          <header style="background-color: #000000; color: #fff; padding: 20px; text-align: center;  border-radius: 0.375rem; margin-top: 0.5rem; margin-bottom: 0.5rem;">
            <h1 style="font-size: 24px;">Campus Placement Portal CTAE</h1>
          </header>
          <main style="padding: 20px;">
            <p style="border-width: 1px; border-style: solid; border-color: #e2e8f0; border-radius: 0.375rem; padding: 1rem; margin-top: 0.5rem; margin-bottom: 0.5rem;">Dear ${receiverDetails?.name} / ${receiverDetails?.email}</p>
            <div style="border-width: 1px; border-style: solid; border-color: #e2e8f0; border-radius: 0.375rem; padding: 1rem; margin-top: 0.5rem; margin-bottom: 0.5rem;"
            >${mailBody}</div>
            <p>Sincerely,</p>
            <p>${senderDetails?.name}<br />${senderDetails?.email}</p>
          </main>
          <footer style="background-color: #000000; color: #fff; padding: 10px; text-align: center; border-radius: 0.375rem; margin-top: 0.5rem; margin-bottom: 0.5rem;">
            <p>&copy; 2023 Campus Placement Portal CTAE</p>
          </footer>
        </div>
      </body>
    </html>`,
  };

  //send mail with defined transport object
  const reply = transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      return false;
    } else {
      // Send a response indicating that the job drive's verified status was updated successfully
      console.log("Message sent: %s", info.messageId);
      return true;
    }
  });
};

export { sendMail };
