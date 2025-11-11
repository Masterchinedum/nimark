import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const emailConfig = {
  from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM}>`,
  domain: process.env.NEXTAUTH_URL || 'http://localhost:3000',
};

export interface SendEmailOptions {
  to: string | string[];
  subject: string;
  react: React.ReactElement;
}

/**
 * Send email using Resend
 */
export async function sendEmail({ to, subject, react }: SendEmailOptions) {
  try {
    const { data, error } = await resend.emails.send({
      from: emailConfig.from,
      to,
      subject,
      react,
    });

    if (error) {
      console.error('Email send error:', error);
      throw new Error(`Failed to send email: ${error.message}`);
    }

    return { success: true, data };
  } catch (error) {
    console.error('Email service error:', error);
    throw error;
  }
}

/**
 * Send verification email
 */
export async function sendVerificationEmail(email: string, token: string) {
  const { VerificationEmail } = await import('@/emails/verification-email');
  const verificationUrl = `${emailConfig.domain}/auth/verify-email?token=${token}`;

  return sendEmail({
    to: email,
    subject: 'Verify your email address',
    react: VerificationEmail({ verificationUrl }),
  });
}

/**
 * Send password reset email
 */
export async function sendPasswordResetEmail(email: string, token: string) {
  const { PasswordResetEmail } = await import('@/emails/password-reset-email');
  const resetUrl = `${emailConfig.domain}/auth/reset-password?token=${token}`;

  return sendEmail({
    to: email,
    subject: 'Reset your password',
    react: PasswordResetEmail({ resetUrl }),
  });
}

/**
 * Send OTP email
 */
export async function sendOTPEmail(email: string, otp: string) {
  const { OTPEmail } = await import('@/emails/otp-email');

  return sendEmail({
    to: email,
    subject: 'Your verification code',
    react: OTPEmail({ otp }),
  });
}

/**
 * Send welcome email
 */
export async function sendWelcomeEmail(email: string, name: string) {
  const { WelcomeEmail } = await import('@/emails/welcome-email');

  return sendEmail({
    to: email,
    subject: 'Welcome to NIMARK Store!',
    react: WelcomeEmail({ name }),
  });
}

/**
 * Send order confirmation email
 */
export async function sendOrderConfirmationEmail(
  email: string,
  orderData: {
    orderNumber: string;
    items: Array<{ name: string; quantity: number; price: number }>;
    total: number;
  }
) {
  const { OrderConfirmationEmail } = await import('@/emails/order-confirmation-email');

  return sendEmail({
    to: email,
    subject: `Order Confirmation - ${orderData.orderNumber}`,
    react: OrderConfirmationEmail(orderData),
  });
}

/**
 * Generate OTP
 */
export function generateOTP(length: number = 6): string {
  const digits = '0123456789';
  let otp = '';
  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * digits.length)];
  }
  return otp;
}

/**
 * Generate secure token
 */
export function generateToken(): string {
  return Array.from({ length: 32 }, () =>
    Math.floor(Math.random() * 16).toString(16)
  ).join('');
}

export default resend;
