import { NextResponse } from 'next/server';

const songs = {
  pop: ['Blinding Lights - The Weeknd', 'Levitating - Dua Lipa', 'As It Was - Harry Styles'],
  rock: ['Hotel California - Eagles', 'Bohemian Rhapsody - Queen', 'Smells Like Teen Spirit - Nirvana'],
  hiphop: ['Sicko Mode - Travis Scott', 'HUMBLE. - Kendrick Lamar', 'God’s Plan - Drake'],
  jazz: ['Take Five - Dave Brubeck', 'So What - Miles Davis', 'Feeling Good - Nina Simone'],
  electronic: ['Strobe - Deadmau5', 'Animals - Martin Garrix', 'Titanium - David Guetta']
};

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const genre = searchParams.get('genre');
  const tracks = songs[genre] || [];
  return NextResponse.json({ tracks });
}
