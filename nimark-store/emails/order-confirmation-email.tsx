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

interface OrderConfirmationEmailProps {
  orderNumber: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  total: number;
}

export const OrderConfirmationEmail = ({
  orderNumber,
  items,
  total,
}: OrderConfirmationEmailProps) => (
  <Html>
    <Head />
    <Preview>Order Confirmation - {orderNumber}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Order Confirmed!</Heading>
        <Text style={text}>
          Thank you for your order. We&apos;ve received your payment and will start
          processing your order shortly.
        </Text>
        <Section style={orderBox}>
          <Text style={orderNumber}>Order #{orderNumber}</Text>
        </Section>
        <Hr style={hr} />
        <Text style={sectionTitle}>Order Summary</Text>
        {items.map((item, index) => (
          <Section key={index} style={itemRow}>
            <Text style={itemName}>
              {item.name} × {item.quantity}
            </Text>
            <Text style={itemPrice}>${item.price.toFixed(2)}</Text>
          </Section>
        ))}
        <Hr style={hr} />
        <Section style={totalRow}>
          <Text style={totalLabel}>Total</Text>
          <Text style={totalPrice}>${total.toFixed(2)}</Text>
        </Section>
        <Section style={buttonContainer}>
          <Button
            style={button}
            href={`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/orders`}
          >
            View Order Details
          </Button>
        </Section>
        <Hr style={hr} />
        <Text style={footer}>
          You&apos;ll receive another email when your order ships. Track your order
          anytime by visiting your account.
        </Text>
      </Container>
    </Body>
  </Html>
);

export default OrderConfirmationEmail;

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

const orderBox = {
  backgroundColor: '#f4f4f5',
  borderRadius: '8px',
  margin: '32px auto',
  padding: '16px',
  textAlign: 'center' as const,
};

const orderNumber = {
  color: '#000',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0',
  fontFamily: 'monospace',
};

const sectionTitle = {
  color: '#333',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '24px 0 16px',
  padding: '0 40px',
};

const itemRow = {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '8px 40px',
};

const itemName = {
  color: '#333',
  fontSize: '14px',
  margin: '0',
};

const itemPrice = {
  color: '#333',
  fontSize: '14px',
  fontWeight: 'bold',
  margin: '0',
};

const totalRow = {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '16px 40px',
};

const totalLabel = {
  color: '#333',
  fontSize: '16px',
  fontWeight: 'bold',
  margin: '0',
};

const totalPrice = {
  color: '#000',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0',
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
  margin: '24px 0',
};

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '16px',
  textAlign: 'center' as const,
  padding: '0 40px',
};
