// pages/api/auth/login.js
import bcrypt from 'bcryptjs';
import User from '../../../../models/auth/User';
import connect from '../../../../utils/connect'; // Ensure this path is correct
import { NextResponse } from 'next/server';

export async function POST(request) {
  const { email, password } = await request.json();

  await connect();

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ success: false, message: 'No user found with this email.' }, { status: 401 });
    }

    const isMatch = bcrypt.compareSync(password, user.password);

    if (!isMatch) {
      return NextResponse.json({ success: false, message: 'Invalid password.' }, { status: 401 });
    }

    return NextResponse.json({ success: true, user: { id: user._id, name: user.name, email: user.email, role: user.role, isadmin: user.isadmin } });
  } catch (error) {
    console.error('Error in login API:', error);
    return NextResponse.json({ success: false, message: 'Server error.' }, { status: 500 });
  }
}
