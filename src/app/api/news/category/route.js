import { NextResponse } from 'next/server';
import Category from '../../../../models/news/Category';
import connect from '../../../../utils/connect';

export async function POST(request) {
  try {
    await connect();
    const { name , slug} = await request.json();
    if (!name) return NextResponse.json({ success: false, message: 'Name is required' }, { status: 400 });

    const category = new Category({ name, slug });
    await category.save();

    return NextResponse.json({ success: true, data: category });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connect();
    const categories = await Category.find();
    return NextResponse.json({ success: true, data: categories });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const { name , id} = await request.json();
    const category = await Category.findByIdAndUpdate(id, { name }, { new: true });
    if (!category) {
      return NextResponse.json({ success: false, message: 'Category not found.' }, { status: 404 });
    }
    return NextResponse.json({ success: true, category });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}