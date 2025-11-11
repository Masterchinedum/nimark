import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface VerificationEmailProps {
  verificationUrl: string;
}

export const VerificationEmail = ({
  verificationUrl,
}: VerificationEmailProps) => (
  <Html>
    <Head />
    <Preview>Verify your email address for NIMARK Store</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Verify your email address</Heading>
        <Text style={text}>
          Thank you for signing up for NIMARK Store! Please verify your email
          address by clicking the button below.
        </Text>
        <Section style={buttonContainer}>
          <Button style={button} href={verificationUrl}>
            Verify Email Address
          </Button>
        </Section>
        <Text style={text}>
          Or copy and paste this URL into your browser:
        </Text>
        <Link href={verificationUrl} style={link}>
          {verificationUrl}
        </Link>
        <Hr style={hr} />
        <Text style={footer}>
          This link will expire in 24 hours. If you didn&apos;t create an account,
          you can safely ignore this email.
        </Text>
      </Container>
    </Body>
  </Html>
);

export default VerificationEmail;

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

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '32px 0',
};

const button = {
  backgroundColor: '#000',
  borderRadius: '5px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 32px',
};

const link = {
  color: '#067df7',
  fontSize: '14px',
  textAlign: 'center' as const,
  display: 'block',
  padding: '0 40px',
  wordBreak: 'break-all' as const,
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
