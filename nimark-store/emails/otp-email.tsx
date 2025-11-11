import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface OTPEmailProps {
  otp: string;
}

export const OTPEmail = ({ otp }: OTPEmailProps) => (
  <Html>
    <Head />
    <Preview>Your NIMARK Store verification code</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Verification Code</Heading>
        <Text style={text}>
          Use this code to verify your identity:
        </Text>
        <Section style={otpContainer}>
          <Text style={otpText}>{otp}</Text>
        </Section>
        <Text style={text}>
          This code will expire in 10 minutes.
        </Text>
        <Hr style={hr} />
        <Text style={footer}>
          If you didn&apos;t request this code, you can safely ignore this email.
          Someone may have accidentally entered your email address.
        </Text>
      </Container>
    </Body>
  </Html>
);

export default OTPEmail;

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
};

const h1 = {
  color: '#333',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '40px 0',
  padding: '0',
  textAlign: 'center' as const,
};

const text = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '26px',
  textAlign: 'center' as const,
  padding: '0 40px',
};

const otpContainer = {
  backgroundColor: '#f4f4f5',
  borderRadius: '8px',
  margin: '32px auto',
  padding: '24px',
  textAlign: 'center' as const,
  width: 'fit-content',
};

const otpText = {
  color: '#000',
  fontSize: '32px',
  fontWeight: 'bold',
  letterSpacing: '8px',
  margin: '0',
  fontFamily: 'monospace',
};

const hr = {
  borderColor: '#dfe1e4',
  margin: '42px 0 26px',
};

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '16px',
  textAlign: 'center' as const,
  padding: '0 40px',
};
