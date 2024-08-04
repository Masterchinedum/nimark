"use client";

import React, { useState } from 'react';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import Button from '@/components/ui/button';
import { toast } from 'react-hot-toast';

interface CheckoutFormProps {
  totalPrice: number;
  onSuccess: () => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ totalPrice, onSuccess }) => {
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [name, setName] = useState('');

  const config = {
    public_key: process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY!,
    tx_ref: Date.now().toString(),
    amount: totalPrice,
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email,
      phone_number: phoneNumber,
      name,
    },
    customizations: {
      title: 'My store',
      description: 'Payment for items in cart',
      logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  const onCheckout = () => {
    if (!email || !phoneNumber || !name) {
      toast.error("Please fill in all customer details.");
      return;
    }

    handleFlutterPayment({
      callback: (response) => {
        console.log(response);
        if (response.status === "successful") {
          toast.success("Payment completed.");
          onSuccess();
        } else {
          toast.error("Payment failed.");
        }
        closePaymentModal() // this will close the modal programmatically
      },
      onClose: () => {
        toast.error("Payment cancelled.");
      },
    });
  }

  return (
    <div className='mt-6'>
      <h3 className='text-md font-medium text-gray-900'>Customer Details</h3>
      <div className='mt-2 space-y-4'>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='w-full px-3 py-2 border border-gray-300 rounded-md'
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className='w-full px-3 py-2 border border-gray-300 rounded-md'
        />
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className='w-full px-3 py-2 border border-gray-300 rounded-md'
        />
      </div>
      <Button className='w-full mt-6' onClick={onCheckout}>
        Checkout
      </Button>
    </div>
  );
}

export default CheckoutForm;