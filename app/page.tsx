'use strict';
import React from 'react';

interface VideoItem {
  _id: string;
  title: string;
  category: string;
  embedUrl: string;
}

async function getVideos(): Promise<VideoItem[]> {
  try {
    const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/videos`, { cache: 'no-store' });
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.log("Database fallback active. Using placeholder catalog items.");
    return [];
  }
}

export default async function Home() {
  const dbVideos = await getVideos();

  const fallbackVideos: VideoItem[] = [
    { _id: '1', title: 'AMV & Edit Concept Reel', category: 'VFX / Composition', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
    { _id: '2', title: 'Hyper-Pop Sound Transition Design', category: 'Sound Effects', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
    { _id: '3', title: 'Cinematic Flow After Effects Scripting', category: 'Presets / Tools', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
  ];

  const videosToDisplay = dbVideos.length > 0 ? dbVideos : fallbackVideos;

  return (
    <main className="min-h-screen bg-black px-6 py-12 max-w-7xl mx-auto space-y-16">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-zinc-900 pb-8 gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tight bg-gradient-to-r from-white via-zinc-400 to-zinc-700 bg-clip-text text-transparent">
            SYLVRIXS PORTFOLIO
          </h1>
          <p className="text-zinc-500 mt-2 text-xs tracking-widest uppercase font-bold">VFX Editing, Dynamic Transitions & Assets</p>
        </div>
        <div className="flex gap-3">
          <a href="#work" className="px-4 py-2 bg-zinc-950 border border-zinc-800 hover:border-purple-600 rounded-md transition text-xs font-semibold uppercase tracking-wider">
            Portfolio
          </a>
          <a href="mailto:contact@domain.com" className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md transition text-xs font-semibold text-white uppercase tracking-wider shadow-md shadow-purple-600/10">
            Contact Me
          </a>
        </div>
      </header>

      <section id="work" className="space-y-6">
        <div className="flex items-center gap-4">
          <h2 className="text-sm font-black tracking-widest uppercase text-purple-500">Selected Visual Works</h2>
          <div className="h-[1px] bg-zinc-900 flex-grow"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videosToDisplay.map((video) => (
            <div key={video._id} className="group bg-zinc-950 border border-zinc-900/80 hover:border-purple-600/40 rounded-lg overflow-hidden transition-all duration-300 flex flex-col">
              <div className="aspect-video w-full bg-zinc-900 relative">
                <iframe 
                  src={video.embedUrl} 
                  className="w-full h-full border-none absolute inset-0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                />
              </div>
              <div className="p-4 flex-grow flex flex-col justify-between gap-1 border-t border-zinc-900/60">
                <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest">{video.category}</span>
                <h3 className="text-sm font-medium text-zinc-200 tracking-wide group-hover:text-white transition-colors">{video.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-zinc-950 border border-zinc-900 p-8 rounded-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-lg font-bold text-white tracking-wide">Looking for Preset Packs?</h3>
          <p className="text-zinc-500 text-xs mt-1">Unlock your flow state with direct ExtendScript utilities, custom shaker configurations, and dynamic transitions.</p>
        </div>
        <button className="px-5 py-2.5 bg-zinc-900 border border-zinc-800 hover:border-purple-500 hover:bg-zinc-950 rounded-lg text-xs font-bold text-zinc-300 uppercase tracking-wider transition-all whitespace-nowrap">
          Browse Presets (Soon)
        </button>
      </section>

      <footer className="text-center text-[11px] text-zinc-700 pt-8 border-t border-zinc-900">
        &copy; {new Date().getFullYear()} Studio. Powered by Next.js, Vercel, and MongoDB. Protected by Cloudflare.
      </footer>
    </main>
  );
}
