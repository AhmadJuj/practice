import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { supabase } from '../../../../lib/supabaseClient'

const JWT_SECRET = process.env.JWT_SECRET

export async function POST(req) {
  const { email, password, name } = await req.json()

  // Check if user exists in Supabase Postgres
  const { data: existingUser, error: findError } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

  if (existingUser) {
    return NextResponse.json({ error: 'User already exists' }, { status: 400 });
  }

  // Hash password
  const hashed = await bcrypt.hash(password, 10);

  // Insert new user
  const { data: newUser, error: insertError } = await supabase
    .from('users')
    .insert([{ name, email, password: hashed }])
    .select()
    .single();

  // Handle DB error
  if (insertError || !newUser) {
    return NextResponse.json({ error: 'Signup failed' }, { status: 500 });
  }

  // Generate JWT
  const token = jwt.sign({ userId: newUser.id, email: newUser.email }, JWT_SECRET, { expiresIn: '2h' });

  return NextResponse.json({
    token,
    user: { id: newUser.id, name: newUser.name, email: newUser.email }
  });
}
