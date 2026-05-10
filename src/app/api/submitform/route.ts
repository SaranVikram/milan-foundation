import { NextResponse } from "next/server";
import { limiter } from "../config/limiter";
import { mailOptions, transporter } from "../../api/config/nodemailer";
import { validateFormData } from "../../api/config/validateFormData";

type FormData = {
  name: string;
  mobile: string;
  email: string;
  subject: string;
  message: string;
};

interface ContactFormData {
  [key: string]: string;
}

interface ContactMessageFields {
  [key: string]: string;
}

const CONTACT_MESSAGE_FIELDS: ContactMessageFields = {
  name: "Name",
  mobile: "Phone Number",
  email: "Email Address",
  subject: "Inquiry Type",
  message: "Message"
};

interface EmailContent {
  text: string;
  html: string;
}

const generateEmailContent = (data: ContactFormData): EmailContent => {
  const stringData: string = Object.entries(data).reduce(
    (str: string, [key, val]: [string, string]) =>
      (str += `${CONTACT_MESSAGE_FIELDS[key]}: \n${val} \n \n`),
    "",
  );

  const htmlData: string = Object.entries(data).reduce(
    (str: string, [key, val]: [string, string]) => {
      return (str += `<h3 class="form-heading" align="left">${CONTACT_MESSAGE_FIELDS[key]}</h3><p class="form-answer" align="left">${val}</p>`);
    },
    "",
  );

  return {
    text: stringData,
    html: `<!DOCTYPE html><html> <head> <title></title> <meta charset="utf-8"/> <meta name="viewport" content="width=device-width, initial-scale=1"/> <meta http-equiv="X-UA-Compatible" content="IE=edge"/> <style type="text/css"> body, table, td, a{-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;}table{border-collapse: collapse !important;}body{height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important;}@media screen and (max-width: 525px){.wrapper{width: 100% !important; max-width: 100% !important;}.responsive-table{width: 100% !important;}.padding{padding: 10px 5% 15px 5% !important;}.section-padding{padding: 0 15px 50px 15px !important;}}.form-container{margin-bottom: 24px; padding: 20px; border: 1px dashed #ccc;}.form-heading{color: #2a2a2a; font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif; font-weight: 400; text-align: left; line-height: 20px; font-size: 18px; margin: 0 0 8px; padding: 0;}.form-answer{color: #2a2a2a; font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif; font-weight: 300; text-align: left; line-height: 20px; font-size: 16px; margin: 0 0 24px; padding: 0;}div[style*="margin: 16px 0;"]{margin: 0 !important;}</style> </head> <body style="margin: 0 !important; padding: 0 !important; background: #fff"> <div style=" display: none; font-size: 1px; color: #fefefe; line-height: 1px;  max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; " ></div><table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td bgcolor="#ffffff" align="center" style="padding: 10px 15px 30px 15px" class="section-padding" > <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 500px" class="responsive-table" > <tr> <td> <table width="100%" border="0" cellspacing="0" cellpadding="0"> <tr> <td> <table width="100%" border="0" cellspacing="0" cellpadding="0" > <tr> <td style=" padding: 0 0 0 0; font-size: 16px; line-height: 25px; color: #232323; " class="padding message-content" > <h2>New Contact Message</h2> <div class="form-container">${htmlData}</div></td></tr></table> </td></tr></table> </td></tr></table> </td></tr></table> </body></html>`,
  };
};

export async function POST(request: Request) {
  try {
    const origin = request.headers.get("origin");
    const headers: HeadersInit = { "Content-Type": "text/plain" };
    if (origin) headers["Access-Control-Allow-Origin"] = origin;

    // Check rate limiting
    const remaining = await limiter.removeTokens(1);
    if (remaining < 0) {
      return new NextResponse(null, {
        status: 429,
        statusText: "Too Many Requests",
        headers,
      });
    }

    // Parse and validate request body
    const formData: FormData = await request.json();
    if (!validateFormData(formData)) {
      return NextResponse.json(
        { error: "Invalid form data provided" },
        { status: 400, headers },
      );
    }

    // Send email
    await transporter.sendMail({
      ...mailOptions,
      ...generateEmailContent(formData),
      subject: `Milan Foundation: ${formData.subject || "New Enquiry"}`,
    });

    // Return success response

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 201 },
    );
  } catch (error: any) {
    // Handle server errors
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}
