import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST() {
  return NextResponse.json(
    { message: 'Payment processing is handled manually (Bitcoin or Apple Pay). Please contact info@k2solutionpro.com.' },
    { status: 410 }
  );
}
