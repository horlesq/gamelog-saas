import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Using the verified domain
const fromEmail = "noreply@gamelog.site";

export async function sendVerificationEmail(email: string, token: string) {
    // Determine base URL dynamically or fallback to localhost
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const confirmLink = `${baseUrl}/api/auth/verify-email?token=${token}`;

    const { data, error } = await resend.emails.send({
        from: `GameLog <${fromEmail}>`,
        to: email,
        subject: "Verify your GameLog account",
        html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; color: #0f172a; padding: 40px; border-radius: 8px; border: 1px solid #e2e8f0;">
                <div style="text-align: center; margin-bottom: 32px;">
                    <div style="display: inline-block; vertical-align: middle;">
                        <img src="https://gamelog.site/3d/next.png" alt="GameLog Logo" style="width: 40px; height: 40px; display: block; margin-right: 6px;" />
                    </div>
                    <div style="display: inline-block; vertical-align: middle;">
                        <h1 style="margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.05em; color: #0f172a;">GameLog</h1>
                    </div>
                </div>
                <div style="text-align: center;">
                    <h2 style="font-size: 20px; font-weight: 700; margin-bottom: 16px;">Verify your email</h2>
                    <p style="color: #64748b; font-size: 16px; line-height: 1.6; margin-bottom: 32px;">
                        Welcome to GameLog! Click the button below to verify your email address and start tracking your gaming journey.
                    </p>
                    <a href="${confirmLink}" style="background-color: #7c3aed; color: #ffffff; padding: 14px 32px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px; display: inline-block;">
                        Verify Email Address
                    </a>
                    <div style="margin-top: 40px; padding-top: 24px; border-top: 1px solid #f1f5f9;">
                        <p style="margin: 0; font-size: 13px; color: #94a3b8;">
                            Or copy and paste this link:
                        </p>
                        <p style="margin-top: 8px; font-size: 12px; word-break: break-all; color: #7c3aed;">
                            ${confirmLink}
                        </p>
                    </div>
                </div>
                <div style="margin-top: 40px; text-align: center;">
                    <p style="font-size: 12px; color: #cbd5e1;">&copy; ${new Date().getFullYear()} GameLog. All rights reserved.</p>
                </div>
            </div>
        `,
    });

    if (error) {
        console.error("Error sending verification email:", error);
        throw new Error("Failed to send verification email");
    }

    return data;
}
