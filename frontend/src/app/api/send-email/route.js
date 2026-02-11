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

        const mailOptions = {
            from: `"${email}" <${process.env.EMAIL_USER}>`, // Shows user's email as name
            to: process.env.EMAIL_USER, // Send to the owner
            replyTo: email, // Allow replying directly to the user
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

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json({ message: 'Failed to send email' }, { status: 500 });
    }
}
