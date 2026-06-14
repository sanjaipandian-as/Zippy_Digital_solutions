import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            console.error('Missing EMAIL_USER or EMAIL_PASS in environment variables');
            return NextResponse.json({ 
                message: 'Server configuration error: Missing email credentials' 
            }, { status: 500 });
        }

        const body = await request.json();
        const { name, email, company, interest, message } = body || {};

        const safeName = name || 'Client';
        const safeEmail = email || '';
        const safeCompany = company || 'N/A';
        const safeInterest = interest || 'Digital Solutions';
        const safeMessage = message || '';

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const logoUrl = "https://zippydigitalsolutions.in/zippywhite.png";

        // 1. Notification Email for Zippy Team (Professional Inbox View)
        const notificationMail = {
            from: `"Zippy Leads" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            cc: ['tech@zippydigitalsolutions.in', 'knock@zippydigitalsolutions.in'],
            replyTo: safeEmail || undefined,
            subject: `🔥 New Lead: ${safeName} (${safeCompany || 'Individual'})`,
            html: `
                <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; background: #0a0a0a; color: #ffffff; padding: 40px; border-radius: 20px;">
                    <img src="${logoUrl}" alt="Zippy Logo" style="width: 120px; margin-bottom: 30px;" />
                    <h2 style="font-size: 24px; font-weight: 800; border-bottom: 1px solid #333; padding-bottom: 10px; margin-bottom: 25px; color: #ffff00;">New Submission</h2>
                    
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 12px 0; color: #888; text-transform: uppercase; font-size: 11px; letter-spacing: 1px; width: 100px;">Name</td>
                            <td style="padding: 12px 0; font-size: 16px; font-weight: 600;">${safeName}</td>
                        </tr>
                        <tr>
                            <td style="padding: 12px 0; color: #888; text-transform: uppercase; font-size: 11px; letter-spacing: 1px;">Email</td>
                            <td style="padding: 12px 0; font-size: 16px; color: #ffff00;">${safeEmail}</td>
                        </tr>
                        <tr>
                            <td style="padding: 12px 0; color: #888; text-transform: uppercase; font-size: 11px; letter-spacing: 1px;">Company</td>
                            <td style="padding: 12px 0; font-size: 16px;">${safeCompany}</td>
                        </tr>
                        <tr>
                            <td style="padding: 12px 0; color: #888; text-transform: uppercase; font-size: 11px; letter-spacing: 1px;">Interest</td>
                            <td style="padding: 12px 0; font-size: 16px; font-weight: 600;">${safeInterest.toUpperCase()}</td>
                        </tr>
                    </table>

                    <div style="margin-top: 30px; padding: 25px; background: #111; border-left: 4px solid #ffff00; border-radius: 8px;">
                        <p style="color: #888; font-size: 11px; text-transform: uppercase; margin: 0 0 10px 0;">Message</p>
                        <p style="margin: 0; line-height: 1.6; font-size: 15px; color: #eee;">${safeMessage}</p>
                    </div>

                    <p style="margin-top: 40px; color: #444; font-size: 11px; text-align: center;">Sent from Zippy Digital Solutions Portal</p>
                </div>
            `
        };

        // 2. Professional Confirmation Email for the Client
        const confirmationMail = {
            from: `"Zippy Digital Solutions" <${process.env.EMAIL_USER}>`,
            to: safeEmail,
            subject: `We've received your inquiry, ${safeName.split(' ')[0]}!`,
            html: `
                <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; color: #000000; padding: 0; border-radius: 16px; overflow: hidden; border: 1px solid #ebebeb;">
                    <div style="background: #000; padding: 40px; text-align: center;">
                        <img src="${logoUrl}" alt="Zippy Logo" style="width: 140px;" />
                    </div>
                    
                    <div style="padding: 40px;">
                        <h1 style="font-size: 28px; font-weight: 800; margin: 0 0 20px 0; letter-spacing: -0.5px;">Hi ${safeName.split(' ')[0]},</h1>
                        <p style="font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 25px;">
                            Thanks for reaching out to <strong>Zippy Digital Solutions</strong>. We've received your project details regarding <strong>${safeInterest}</strong> and our team is already reviewing them.
                        </p>
                        
                        <div style="background: #f7f7f7; padding: 25px; border-radius: 12px; margin-bottom: 25px;">
                            <p style="margin: 0 0 15px 0; font-size: 12px; font-weight: 800; text-transform: uppercase; color: #888; letter-spacing: 1px;">Details Shared:</p>
                            <p style="margin: 0 0 8px 0; font-size: 14px;"><strong>Interest:</strong> ${safeInterest}</p>
                            <p style="margin: 0; font-size: 14px;"><strong>Company:</strong> ${safeCompany}</p>
                        </div>

                        <p style="font-size: 16px; line-height: 1.6; color: #333;">
                            Expect a formal response from one of our specialists within the next <strong>24 business hours</strong> to discuss the next steps.
                        </p>

                        <div style="margin-top: 40px; padding-top: 30px; border-top: 1px solid #eee;">
                            <p style="margin: 0; font-size: 14px; font-weight: 700;">Best regards,</p>
                            <p style="margin: 4px 0 0 0; font-size: 14px; color: #666;">The Zippy Creative Team</p>
                        </div>
                    </div>

                    <div style="background: #fcfcfc; padding: 20px; text-align: center; font-size: 11px; color: #aaa;">
                        © ${new Date().getFullYear()} Zippy Digital Solutions. Crafted for Excellence.
                    </div>
                </div>
            `,
        };

        // Send both emails
        await Promise.all([
            transporter.sendMail(notificationMail),
            transporter.sendMail(confirmationMail),
        ]);

        return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json({ 
            message: 'Failed to send email', 
            error: error.message || String(error) 
        }, { status: 500 });
    }
}
