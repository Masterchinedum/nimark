import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { rateLimiter } from '@/lib/redis';

export async function POST(req: Request) {
  try {
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json(
        { error: 'Email and OTP are required' },
        { status: 400 }
      );
    }

    // Rate limiting: 5 attempts per 15 minutes
    const allowed = await rateLimiter.check(`verify-otp:${email}`, 5, 900);
    if (!allowed) {
      return NextResponse.json(
        { error: 'Too many attempts. Please try again later.' },
        { status: 429 }
      );
    }

    // Find OTP
    const verificationToken = await prisma.verificationToken.findFirst({
      where: {
        identifier: email,
        token: otp,
        type: 'otp',
      },
    });

    if (!verificationToken) {
      return NextResponse.json(
        { error: 'Invalid OTP' },
        { status: 400 }
      );
    }

    // Check if expired
    if (verificationToken.expires < new Date()) {
      await prisma.verificationToken.delete({
        where: {
          identifier: verificationToken.identifier,
          token: verificationToken.token,
        },
      });
      return NextResponse.json(
        { error: 'OTP expired' },
        { status: 400 }
      );
    }

    // Delete OTP after successful verification
    await prisma.verificationToken.delete({
      where: {
        identifier: verificationToken.identifier,
        token: verificationToken.token,
      },
    });

    return NextResponse.json({
      message: 'OTP verified successfully',
    });
  } catch (error) {
    console.error('Verify OTP error:', error);
    return NextResponse.json(
      { error: 'Failed to verify OTP' },
      { status: 500 }
    );
  }
}
