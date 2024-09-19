import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const { storeId } = params;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  try {
    const response = await fetch(`${apiUrl}/${storeId}/billboards`);
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching billboards:', error);
    return NextResponse.json({ error: 'Failed to fetch billboards' }, { status: 500 });
  }
}