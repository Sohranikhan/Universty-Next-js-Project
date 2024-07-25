import { NextResponse } from 'next/server';
import Download from '../../../models/downloads/Downloads';
import connect from '../../../utils/connect';

export async function GET() {
  try {
    await connect();
    const downloads = await Download.find();
    return NextResponse.json({ success: true, data: downloads });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch downloads' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { title, url } = await request.json();
    await connect();
    const download = new Download({ title, url });
    await download.save();
    return NextResponse.json({ success: true, data: download }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create download' }, { status: 500 });
  }
}


export async function PATCH(request) {
    const { title, url, id } = await request.json();
  
    try {
      await connect();
      const download = await Download.findByIdAndUpdate(id, { title, url }, { new: true });
      if (!download) {
        return NextResponse.json({ success: false, error: 'Download not found' }, { status: 404 });
      }
      return NextResponse.json({ success: true, data: download });
    } catch (error) {
      return NextResponse.json({ success: false, error: 'Failed to update download' }, { status: 500 });
    }
  }