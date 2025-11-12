# Email Service Setup Guide

This guide explains how to set up and use the email service in the NIMARK Store application.

## Overview

The application uses [Resend](https://resend.com/) for sending transactional emails with React Email for templating. The email service supports:

- Email verification for new registrations
- Password reset emails
- One-Time Password (OTP) authentication
- Welcome emails
- Order confirmation emails

## Configuration

### 1. Get Resend API Key

1. Sign up at [https://resend.com](https://resend.com)
2. Go to **API Keys** section
3. Create a new API key
4. Copy the key (starts with `re_`)

### 2. Verify Domain (Production)

For production, you need to verify your domain:

1. Go to **Domains** in Resend dashboard
2. Add your domain (e.g., `nextab.dev`)
3. Add the provided DNS records to your domain
4. Wait for verification (usually takes a few minutes)

For development, you can use Resend's test mode (limited to your verified email addresses).

### 3. Environment Variables

Update your `.env` file:

```env
# Email Configuration (Resend)
RESEND_API_KEY="re_your_actual_api_key_here"
EMAIL_FROM="noreply@nextab.dev"
EMAIL_FROM_NAME="NIMARK Store"
```

**Important:**
- Replace `re_your_actual_api_key_here` with your actual Resend API key
- In production, use your verified domain in `EMAIL_FROM`
- In development, you can use `onboarding@resend.dev` as `EMAIL_FROM`

## Email Templates

All email templates are located in the `/emails` directory:

### Available Templates

1. **verification-email.tsx** - Email verification for new users
2. **password-reset-email.tsx** - Password reset requests
3. **otp-email.tsx** - One-Time Password codes
4. **welcome-email.tsx** - Welcome message for new users
5. **order-confirmation-email.tsx** - Order confirmations

### Customizing Templates

Templates use `@react-email/components`. To customize:

```tsx
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
} from '@react-email/components';

export const MyEmail = ({ name }: { name: string }) => (
  <Html>
    <Head />
    <Preview>Preview text here</Preview>
    <Body>
      <Container>
        <Heading>Hello {name}</Heading>
        <Text>Your email content here</Text>
        <Button href="https://example.com">Click me</Button>
      </Container>
    </Body>
  </Html>
);
```

## Email Functions

### Core Functions (`/lib/email.ts`)

```typescript
// Send any email
await sendEmail({
  to: 'user@example.com',
  subject: 'Subject',
  react: <EmailTemplate />,
});

// Send verification email
await sendVerificationEmail('user@example.com', 'token123');

// Send password reset email
await sendPasswordResetEmail('user@example.com', 'token123');

// Send OTP email
await sendOTPEmail('user@example.com', '123456');

// Send welcome email
await sendWelcomeEmail('user@example.com', 'John Doe');

// Send order confirmation
await sendOrderConfirmationEmail('user@example.com', {
  orderNumber: 'ORD-123',
  items: [...],
  total: 99.99,
});
```

### Utility Functions

```typescript
// Generate 6-digit OTP
const otp = generateOTP(6);

// Generate secure token
const token = generateToken();
```

## API Endpoints

### Email Verification

**Send Verification Email**
```
POST /api/auth/send-verification
Body: { email: string }
```

**Verify Email**
```
GET /api/auth/verify-email?token=xxx
```

### Password Reset

**Request Password Reset**
```
POST /api/auth/forgot-password
Body: { email: string }
Rate Limit: 3 requests per hour
```

**Reset Password**
```
POST /api/auth/reset-password
Body: { token: string, password: string }
```

### OTP

**Send OTP**
```
POST /api/auth/send-otp
Body: { email: string }
Rate Limit: 3 requests per 15 minutes
```

**Verify OTP**
```
POST /api/auth/verify-otp
Body: { email: string, otp: string }
Rate Limit: 5 attempts per 15 minutes
```

## User Flow

### Registration with Email Verification

1. User registers via `/api/auth/register`
2. System creates user account (unverified)
3. System generates verification token (24-hour expiry)
4. System sends verification email
5. System sends welcome email
6. User clicks link in email
7. System verifies token via `/api/auth/verify-email`
8. System updates `emailVerified` field
9. User can now sign in

### Password Reset Flow

1. User requests reset via `/api/auth/forgot-password`
2. System generates reset token (1-hour expiry)
3. System sends reset email
4. User clicks link in email
5. User enters new password on reset page
6. System validates token and updates password
7. System invalidates all existing sessions
8. User signs in with new password

### OTP Flow

1. User requests OTP via `/api/auth/send-otp`
2. System generates 6-digit code (10-minute expiry)
3. System sends OTP email
4. User enters OTP
5. System verifies via `/api/auth/verify-otp`
6. System deletes OTP after successful verification

## Security Features

### Rate Limiting

- **Registration**: 3 attempts per hour per email
- **Login**: 5 attempts per 15 minutes per email
- **Password Reset**: 3 requests per hour per email
- **Send OTP**: 3 requests per 15 minutes per email
- **Verify OTP**: 5 attempts per 15 minutes per email

### Token Security

- **Email Verification**: 24-hour expiry, 32-character random token
- **Password Reset**: 1-hour expiry, 32-character random token
- **OTP**: 10-minute expiry, 6-digit numeric code

### Database Storage

All tokens are stored in the `verification_tokens` table with:
- `identifier`: User email
- `token`: Unique token/OTP
- `expires`: Expiration timestamp
- `type`: Token type (email, password_reset, otp)

## Development Testing

### Testing Emails Locally

Resend allows testing in development mode:

1. Add your test email to Resend's allowed list
2. Update `EMAIL_FROM` to use `onboarding@resend.dev`
3. Emails will only be sent to verified addresses

### Preview Emails

You can preview email templates without sending:

```bash
cd nimark-store
npm run dev
```

Then visit: `http://localhost:3000/api/preview-email`

## Production Checklist

- [ ] Domain verified in Resend dashboard
- [ ] DNS records configured correctly
- [ ] `RESEND_API_KEY` updated in production environment
- [ ] `EMAIL_FROM` using verified domain
- [ ] `EMAIL_FROM_NAME` set appropriately
- [ ] Test all email flows (verification, reset, OTP)
- [ ] Monitor email delivery in Resend dashboard
- [ ] Set up email logs for debugging
- [ ] Configure SPF and DKIM records
- [ ] Enable DMARC for additional security

## Troubleshooting

### Emails Not Sending

1. Check `RESEND_API_KEY` is correct
2. Verify domain is verified (production)
3. Check Resend dashboard for errors
4. Look at server logs for error messages
5. Ensure rate limits aren't exceeded

### Emails Going to Spam

1. Verify domain DNS records (SPF, DKIM, DMARC)
2. Use professional email content
3. Avoid spam trigger words
4. Include unsubscribe links (for marketing emails)
5. Warm up new sending domain gradually

### Token Expiration Issues

1. Check server time is synchronized
2. Verify token expiry times in code
3. Ensure Redis is running for caching
4. Check database token records

## Best Practices

1. **Always use async/await** when sending emails
2. **Don't block registration** on email sending
3. **Log email errors** for debugging
4. **Use descriptive subjects** for better open rates
5. **Test templates** on multiple email clients
6. **Monitor delivery rates** in Resend dashboard
7. **Keep templates simple** for better compatibility
8. **Use preview text** for better user experience
9. **Include fallback text** for links
10. **Respect rate limits** to avoid blocking

## Support

- Resend Documentation: https://resend.com/docs
- React Email Documentation: https://react.email/docs
- NIMARK Store Documentation: See other MD files in this directory

## Next Steps

1. Update `RESEND_API_KEY` in `.env`
2. Test email verification flow
3. Test password reset flow
4. Test OTP flow
5. Customize email templates if needed
6. Set up production domain verification
7. Configure monitoring and alerts
