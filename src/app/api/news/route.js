import { NextResponse } from 'next/server';
import News from '../../../models/news/News';
import Category from '../../../models/news/Category';
import connect from '../../../utils/connect';

//

export async function POST(request) {
  try {
    await connect();
    const { title, slug, description, category } = await request.json();
    if (!title || !description || !category) return NextResponse.json({ success: false, message: 'All fields are required' }, { status: 400 });

    const validCategory = await Category.findById(category);
    if (!validCategory) return NextResponse.json({ success: false, message: 'Invalid category ID' }, { status: 400 });

    const news = new News({ title, description, slug, category });
    await news.save();

    return NextResponse.json({ success: true, data: news });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function GET(req) {

  try {
    await connect();
    // Fetch news data
    const news = await News.find({}).populate({
      path: 'category',
      model: 'Category',
      select: 'name',
    }).sort({ createdAt: -1 }).limit(10).exec();
    return NextResponse.json({
      success: true,
      data: news,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}


export async function PATCH(request) {
  try {
    await connect();
    const { id, title, description, category } = await request.json();
    if (!id) return NextResponse.json({ success: false, message: 'ID is required' }, { status: 400 });

    const news = await News.findById(id);
    if (!news) return NextResponse.json({ success: false, message: 'News not found' }, { status: 404 });

    if (title) news.title = title;
    if (description) news.description = description;
    if (category) {
      const validCategory = await Category.findById(category);
      if (!validCategory) return NextResponse.json({ success: false, message: 'Invalid category ID' }, { status: 400 });
      news.category = category;
    }

    await news.save();
    return NextResponse.json({ success: true, data: news });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
