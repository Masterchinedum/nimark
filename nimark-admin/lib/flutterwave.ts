import Flutterwave from 'flutterwave-node-v3';

export const flutterwave = new Flutterwave(
  process.env.FLUTTERWAVE_PUBLIC_KEY!,
  process.env.FLUTTERWAVE_SECRET_KEY!,
  process.env.NODE_ENV === 'production'
);

export const flutterwaveEncKey = process.env.FLUTTERWAVE_ENCRYPTION_KEY!;