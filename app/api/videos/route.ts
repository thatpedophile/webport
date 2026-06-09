import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('portfolio');
    const videos = await db.collection('videos').find({}).toArray();
    return NextResponse.json(videos, { status: 200 });
  } catch (e) {
    console.error('Database connection error:', e);
    return NextResponse.json({ error: 'Failed to fetch items from database' }, { status: 500 });
  }
}
