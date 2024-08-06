"use client";

import React, { useState } from 'react';
import Button from '@/components/ui/button';
import { toast } from 'react-hot-toast';
import axios from 'axios';

interface CheckoutFormProps {
  productIds: string[];
  onSuccess: () => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ productIds, onSuccess }) => {
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onCheckout = async () => {
    if (!email || !phoneNumber || !name) {
      toast.error("Please fill in all customer details.");
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
        productIds,
        customerInfo: { email, phoneNumber, name }
      });

      window.location.href = response.data.url;
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
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
      <Button disabled={isLoading} className='w-full mt-6' onClick={onCheckout}>
        {isLoading ? 'Processing...' : 'Checkout'}
      </Button>
    </div>
  );
}

export default CheckoutForm;