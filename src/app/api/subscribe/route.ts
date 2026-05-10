import { NextResponse } from "next/server";
import { transporter, mailOptions } from "../config/nodemailer";

export async function POST(request: Request) {
  try {
    const { name, email } = await request.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    // Send notification email
    await transporter.sendMail({
      ...mailOptions,
      subject: `New Newsletter Subscription: ${name || "Subscriber"}`,
      text: `A new person has subscribed to the Milan Foundation newsletter.\n\nName: ${name || "N/A"}\nEmail: ${email}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #72BE44;">New Newsletter Subscription</h2>
          <p><strong>Name:</strong> ${name || "N/A"}</p>
          <p><strong>Email:</strong> ${email}</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="font-size: 12px; color: #888;">This is an automated notification from Milan Foundation Website.</p>
        </div>
      `,
    });

    return NextResponse.json({ message: "Subscribed successfully" }, { status: 201 });
  } catch (error) {
    console.error("Subscription Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
