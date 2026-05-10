import nodemailer, { Transporter } from "nodemailer";

const email: string = process.env.SMTP_EMAIL || "contact@milanfoundation.ngo";
const pass: string = process.env.SMTP_PASSWORD || "";
const smtpHost: string = process.env.SMTP_HOST || "smtp.zoho.com";
const smtpPort: number = parseInt(process.env.SMTP_PORT || "465", 10);

const transporter: Transporter = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPort,
  secure: smtpPort === 465,
  auth: {
    user: email,
    pass: pass,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const recipientEmail = process.env.CONTACT_RECIPIENT_EMAILS || "";

const mailOptions = {
  from: email,
  to: recipientEmail,
};

export { transporter, mailOptions };
