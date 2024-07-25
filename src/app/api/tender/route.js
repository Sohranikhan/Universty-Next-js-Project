import { NextResponse } from 'next/server';
import Download from '../../../models/downloads/Downloads';
import connect from '../../../utils/connect';
import Tender from '../../../models/tender/Tender';

export async function GET() {
  try {
    await connect();
    const today = new Date();
    const last30Days = new Date();
    last30Days.setDate(today.getDate() - 30); // Get the date 30 days ago

    const tenders = await Tender.find({
      createdAt: {
        $gte: last30Days,
        $lte: today
      }
    })
    .sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: tenders });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch tender' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { title, url } = await request.json();
    await connect();
    const tender = new Tender({ title, url });
    await tender.save();
    return NextResponse.json({ success: true, message: "Tender Created" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}


export async function PATCH(request) {
  const { title, url, id } = await request.json();

  try {
    await connect();
    const tender = await Tender.findByIdAndUpdate(id, { title, url }, { new: true });
    if (!tender) {
      return NextResponse.json({ success: false, error: 'Tender not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: tender });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update tender' }, { status: 500 });
  }
}