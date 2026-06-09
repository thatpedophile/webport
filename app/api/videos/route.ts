import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export const dynamic = 'force-dynamic';

export async function GET() {
  // If the promise is null, the URI was missing (such as during Vercel's build phase)
  if (!clientPromise) {
    console.warn("Database client not initialized. Returning fallback template data.");
    return NextResponse.json([
      { _id: '1', title: 'AMV & Edit Concept Reel', category: 'VFX / Composition', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
      { _id: '2', title: 'Hyper-Pop Sound Transition Design', category: 'Sound Effects', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
    ], { status: 200 });
  }

  try {
    const client = await clientPromise;
    const db = client.db('portfolio');
    const videos = await db.collection('videos').find({}).toArray();
    return NextResponse.json(videos, { status: 200 });
  } catch (e) {
    console.error('Database query execution error:', e);
    return NextResponse.json({ error: 'Failed to extract items from database' }, { status: 500 });
  }
}
