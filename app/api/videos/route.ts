import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export const dynamic = 'force-dynamic';

export async function GET() {
  // 1. Graceful check instead of throwing a hard error during build time
  if (!process.env.MONGODB_URI) {
    console.warn("Warning: MONGODB_URI is missing. Returning placeholder data.");
    return NextResponse.json([
      { _id: '1', title: 'AMV & Edit Concept Reel', category: 'VFX / Composition', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
    ], { status: 200 });
  }

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
