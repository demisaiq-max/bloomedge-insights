// @ts-nocheck
/* eslint-disable */
/**
 * Supabase Edge Function - Custom Email Hook
 * This file runs in Deno runtime on Supabase, not in the local Node.js environment.
 */

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface EmailHookPayload {
  user: {
    email: string;
    user_metadata?: {
      full_name?: string;
    };
  };
  email_data: {
    token: string;
    token_hash: string;
    redirect_to: string;
    email_action_type: string;
    site_url: string;
    token_new?: string;
    token_hash_new?: string;
  };
}

const getPasswordResetEmailHtml = (
  userName: string,
  resetLink: string
): string => {
  const currentYear = new Date().getFullYear();
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password - BloomEdge Enterprises</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8f9fa;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table role="presentation" style="width: 600px; max-width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);">
          <tr>
            <td style="background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); padding: 40px 40px 30px 40px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600; letter-spacing: -0.5px;">BloomEdge Enterprises</h1>
              <p style="margin: 8px 0 0 0; color: rgba(255, 255, 255, 0.9); font-size: 14px;">Quality products delivered to your doorstep</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 20px 0; color: #1f2937; font-size: 24px; font-weight: 600;">Password Reset Request</h2>
              <p style="margin: 0 0 20px 0; color: #4b5563; font-size: 16px; line-height: 1.6;">
                Hello${userName ? ` ${userName}` : ''},
              </p>
              <p style="margin: 0 0 24px 0; color: #4b5563; font-size: 16px; line-height: 1.6;">
                We received a request to reset your password for your BloomEdge Enterprises account. Click the button below to create a new password:
              </p>
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td align="center" style="padding: 10px 0 30px 0;">
                    <a href="${resetLink}" style="display: inline-block; padding: 16px 40px; background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); color: #ffffff; text-decoration: none; font-size: 16px; font-weight: 600; border-radius: 8px; letter-spacing: 0.5px; box-shadow: 0 4px 14px rgba(34, 197, 94, 0.4);">
                      Reset My Password
                    </a>
                  </td>
                </tr>
              </table>
              <p style="margin: 0 0 16px 0; color: #6b7280; font-size: 14px; line-height: 1.6;">
                This link will expire in 1 hour for security reasons. If you didn't request a password reset, you can safely ignore this email.
              </p>
              <p style="margin: 0 0 24px 0; color: #6b7280; font-size: 14px; line-height: 1.6;">
                If the button doesn't work, copy and paste this link into your browser:
              </p>
              <p style="margin: 0; padding: 16px; background-color: #f3f4f6; border-radius: 8px; word-break: break-all; color: #22c55e; font-size: 13px; font-family: monospace;">
                ${resetLink}
              </p>
            </td>
          </tr>
          <tr>
            <td style="background-color: #f9fafb; padding: 30px 40px; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 12px 0; color: #6b7280; font-size: 14px; text-align: center;">
                Need help? Contact our support team
              </p>
              <p style="margin: 0; color: #9ca3af; font-size: 12px; text-align: center;">
                © ${currentYear} BloomEdge Enterprises. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
};

const getSignupConfirmationEmailHtml = (
  userName: string,
  confirmLink: string
): string => {
  const currentYear = new Date().getFullYear();
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to BloomEdge Enterprises</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8f9fa;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table role="presentation" style="width: 600px; max-width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);">
          <tr>
            <td style="background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); padding: 40px 40px 30px 40px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600; letter-spacing: -0.5px;">BloomEdge Enterprises</h1>
              <p style="margin: 8px 0 0 0; color: rgba(255, 255, 255, 0.9); font-size: 14px;">Quality products delivered to your doorstep</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 20px 0; color: #1f2937; font-size: 24px; font-weight: 600;">Welcome to BloomEdge!</h2>
              <p style="margin: 0 0 20px 0; color: #4b5563; font-size: 16px; line-height: 1.6;">
                Hello${userName ? ` ${userName}` : ''},
              </p>
              <p style="margin: 0 0 24px 0; color: #4b5563; font-size: 16px; line-height: 1.6;">
                Thank you for signing up! Please confirm your email address by clicking the button below:
              </p>
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td align="center" style="padding: 10px 0 30px 0;">
                    <a href="${confirmLink}" style="display: inline-block; padding: 16px 40px; background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); color: #ffffff; text-decoration: none; font-size: 16px; font-weight: 600; border-radius: 8px; letter-spacing: 0.5px; box-shadow: 0 4px 14px rgba(34, 197, 94, 0.4);">
                      Confirm Email
                    </a>
                  </td>
                </tr>
              </table>
              <p style="margin: 0 0 16px 0; color: #6b7280; font-size: 14px; line-height: 1.6;">
                If you didn't create an account with us, you can safely ignore this email.
              </p>
            </td>
          </tr>
          <tr>
            <td style="background-color: #f9fafb; padding: 30px 40px; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 12px 0; color: #6b7280; font-size: 14px; text-align: center;">
                Need help? Contact our support team
              </p>
              <p style="margin: 0; color: #9ca3af; font-size: 12px; text-align: center;">
                © ${currentYear} BloomEdge Enterprises. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
};

async function sendEmailWithResend(apiKey: string, to: string, subject: string, html: string) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "BloomEdge Enterprises <onboarding@resend.dev>",
      to: [to],
      subject,
      html,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to send email");
  }

  return response.json();
}

Deno.serve(async (req: Request): Promise<Response> => {
  console.log("Email hook received request:", req.method);

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const payload: EmailHookPayload = await req.json();
    console.log("Email hook payload:", JSON.stringify(payload, null, 2));

    const { user, email_data } = payload;
    const { token_hash, redirect_to, email_action_type } = email_data;

    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const resendApiKey = Deno.env.get("RESEND_API_KEY") ?? "";
    const userName = user.user_metadata?.full_name ?? "";

    if (!resendApiKey) {
      throw new Error("RESEND_API_KEY not configured");
    }

    let subject = "";
    let html = "";
    const confirmationLink = `${supabaseUrl}/auth/v1/verify?token=${token_hash}&type=${email_action_type}&redirect_to=${redirect_to}`;

    switch (email_action_type) {
      case "recovery":
        subject = "Reset Your Password - BloomEdge Enterprises";
        html = getPasswordResetEmailHtml(userName, confirmationLink);
        break;
      case "signup":
      case "email_confirmation":
        subject = "Welcome to BloomEdge Enterprises - Confirm Your Email";
        html = getSignupConfirmationEmailHtml(userName, confirmationLink);
        break;
      case "magiclink":
        subject = "Your Login Link - BloomEdge Enterprises";
        html = getPasswordResetEmailHtml(userName, confirmationLink);
        break;
      default:
        subject = "BloomEdge Enterprises";
        html = getPasswordResetEmailHtml(userName, confirmationLink);
    }

    console.log("Sending email to:", user.email, "Type:", email_action_type);

    await sendEmailWithResend(resendApiKey, user.email, subject, html);

    console.log("Email sent successfully to:", user.email);

    return new Response(JSON.stringify({}), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error) {
    console.error("Error in email-hook function:", error);
    return new Response(
      JSON.stringify({
        error: {
          http_code: 500,
          message: error instanceof Error ? error.message : "Unknown error",
        },
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
});
