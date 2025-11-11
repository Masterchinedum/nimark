import {
  Body,
  Button,
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

interface WelcomeEmailProps {
  name: string;
}

export const WelcomeEmail = ({ name }: WelcomeEmailProps) => (
  <Html>
    <Head />
    <Preview>Welcome to NIMARK Store!</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Welcome to NIMARK Store!</Heading>
        <Text style={text}>
          Hi {name},
        </Text>
        <Text style={text}>
          Thank you for joining NIMARK Store! We&apos;re excited to have you as
          part of our community.
        </Text>
        <Text style={text}>
          Explore our collection of premium electronics, laptops, mobile phones,
          and accessories. We&apos;re committed to providing you with the best
          shopping experience.
        </Text>
        <Section style={buttonContainer}>
          <Button style={button} href={`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}`}>
            Start Shopping
          </Button>
        </Section>
        <Hr style={hr} />
        <Text style={footer}>
          If you have any questions, feel free to reply to this email. We&apos;re
          here to help!
        </Text>
        <Text style={footer}>
          The NIMARK Store Team
        </Text>
      </Container>
    </Body>
  </Html>
);

export default WelcomeEmail;

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
  marginBottom: '20px',
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
  marginTop: '12px',
};
