import { NextResponse } from 'next/server';
import { connectDB } from './db.js';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  genre: String,
  mood: String,
  vibe: String,
  loudness: String,
  favoriteTrack: String
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export async function GET() {
  await connectDB();
  const users = await User.find();
  return NextResponse.json({ users });
}

export async function POST(request) {
  await connectDB();
  const body = await request.json();
  const newUser = new User(body);
  await newUser.save();
  return NextResponse.json({ message: 'User added successfully' });
}

export async function PUT(request) {
  await connectDB();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const body = await request.json();
  await User.findByIdAndUpdate(id, body);
  return NextResponse.json({ message: 'User updated successfully' });
}

export async function DELETE(request) {
  await connectDB();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  await User.findByIdAndDelete(id);
  return NextResponse.json({ message: 'User deleted successfully' });
}
