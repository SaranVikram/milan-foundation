import nodemailer, { Transporter } from "nodemailer";

// All credentials MUST come from environment variables
const email: string = process.env.SMTP_EMAIL || "";
const pass: string = process.env.SMTP_PASSWORD || "";
const smtpHost: string = process.env.SMTP_HOST || "smtp.office365.com";
const smtpPort: number = parseInt(process.env.SMTP_PORT || "587", 10);

// Comma-separated list of recipient emails from env
const contactRecipientEmails: string[] = (
  process.env.CONTACT_RECIPIENT_EMAILS || ""
)
  .split(",")
  .map((e) => e.trim())
  .filter(Boolean);

const transporter: Transporter = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPort,
  secure: false, // false for STARTTLS
  requireTLS: true,
  auth: {
    user: email,
    pass: pass,
  },
  tls: {
    ciphers: "SSLv3",
  },
});

// --- Contact Form Email ---
interface ContactFormData {
  name: string;
  designation: string;
  company: string;
  location: string;
  phone: string;
  email: string;
  enquiryType: string;
  message: string;
}

export async function sendContactFormEmail(formData: ContactFormData) {
  if (!email || !pass) {
    throw new Error(
      "SMTP credentials not configured. Set SMTP_EMAIL and SMTP_PASSWORD environment variables."
    );
  }

  if (contactRecipientEmails.length === 0) {
    throw new Error(
      "No recipient emails configured. Set CONTACT_RECIPIENT_EMAILS environment variable."
    );
  }

  const { name, email: userEmail, message } = formData;

  const siteTitle = process.env.SITE_TITLE || "Website";

  // Basic HTML escaping for user input to prevent XSS in email body
  const escapeHtml = (unsafe: string | undefined | null): string => {
    if (unsafe === undefined || unsafe === null) {
      return "";
    }
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 20px auto; border: 1px solid #e2e8f0; padding: 20px; border-radius: 8px; background-color: #ffffff;">
      <h2 style="color: #1a365d; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px; margin-bottom: 20px;">New Contact Form Submission - ${escapeHtml(siteTitle)}</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Designation:</strong> ${escapeHtml(formData.designation)}</p>
      <p><strong>Company:</strong> ${escapeHtml(formData.company)}</p>
      <p><strong>Location:</strong> ${escapeHtml(formData.location)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(formData.phone)}</p>
      <p><strong>Email:</strong> ${escapeHtml(userEmail)}</p>
      <p><strong>Enquiry Type:</strong> ${escapeHtml(formData.enquiryType)}</p>
      <p><strong>Message:</strong></p>
      <p style="white-space: pre-wrap; background-color: #f7fafc; padding: 10px; border-radius: 4px;">${escapeHtml(message)}</p>
      <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;">
      <p style="font-size: 12px; color: #718096;">
        This message was sent from the contact form on ${escapeHtml(siteTitle)}
      </p>
    </div>
  `;

  const textBody = `
New Contact Form Submission - ${siteTitle}:

Name: ${name}
Designation: ${formData.designation}
Company: ${formData.company}
Location: ${formData.location}
Phone: ${formData.phone}
Email: ${userEmail}
Enquiry Type: ${formData.enquiryType}

Message:
${message}

-------------------------------------
Sent from ${siteTitle} contact form
  `;

  // Construct email subject based on enquiry type
  const emailSubject = `Contact Form: ${formData.enquiryType || "General Enquiry"}`;

  try {
    await transporter.sendMail({
      from: `"${siteTitle} Contact Form" <${email}>`,
      to: contactRecipientEmails.join(", "),
      replyTo: userEmail,
      subject: emailSubject,
      html: htmlBody,
      text: textBody,
    });
    console.log(
      `Contact form email sent successfully to ${contactRecipientEmails.join(", ")}`
    );
  } catch (error) {
    console.error("Error sending contact form email:", error);
    throw new Error("Failed to send message. Please try again later.");
  }
}
