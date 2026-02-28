import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const { email, company, interest, message } = await request.json();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // 1. Send notification to business owner + Zippy team
        const mailOptions = {
            from: `"${email}" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            cc: 'tech@zippydigitalsolutions.in',
            replyTo: email,
            subject: `New Contact Form Submission from ${company || email}`,
            text: `
        Name/Email: ${email}
        Company: ${company}
        Interest: ${interest}
        Message: ${message}
      `,
            html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Interest:</strong> ${interest}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
        };

        // 2. Send confirmation copy to the visitor
        const confirmationMail = {
            from: `"Zippy Digital Solutions" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: `We received your message — Zippy Digital Solutions`,
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; background: #f9f9f9; border-radius: 12px;">
            <div style="text-align: center; margin-bottom: 24px;">
                <h2 style="color: #000; margin: 0;">Zippy Digital Solutions</h2>
                <p style="color: #888; font-size: 12px; letter-spacing: 2px; text-transform: uppercase;">Thank you for reaching out!</p>
            </div>
            <div style="background: #fff; padding: 24px; border-radius: 8px; border: 1px solid #eee;">
                <p style="color: #333; font-size: 15px; line-height: 1.6;">
                    Hi${company ? ` <strong>${company}</strong>` : ''},
                </p>
                <p style="color: #333; font-size: 15px; line-height: 1.6;">
                    We've received your message and our team will get back to you within <strong>24 hours</strong>.
                </p>
                <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
                <p style="color: #888; font-size: 13px; margin-bottom: 4px;"><strong>Your submission details:</strong></p>
                <p style="color: #555; font-size: 14px; line-height: 1.6;">
                    <strong>Interest:</strong> ${interest}<br/>
                    <strong>Message:</strong> ${message}
                </p>
            </div>
            <p style="text-align: center; color: #aaa; font-size: 11px; margin-top: 20px;">
                © ${new Date().getFullYear()} Zippy Digital Solutions. All rights reserved.
            </p>
        </div>
      `,
        };

        // Send both emails
        await Promise.all([
            transporter.sendMail(mailOptions),
            transporter.sendMail(confirmationMail),
        ]);

        return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json({ message: 'Failed to send email' }, { status: 500 });
    }
}
