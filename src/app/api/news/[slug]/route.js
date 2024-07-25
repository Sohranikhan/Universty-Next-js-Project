import Category from "../../../../models/news/Category";
import News from "../../../../models/news/News";
import connect from "../../../../utils/connect";
import { NextResponse } from "next/server";

// Handles GET requests for a specific news item by slug
export const GET = async (request, { params }) => {
  await connect(); // Ensure DB connection is established
  const { slug } = params;

  try {
    // Find the news item by slug and populate the category field
    const newsItem = await News.findOne({ slug: slug })
      .populate({
        path: 'category', // Ensure the correct field name for the category
        model: 'Category', // Ensure the correct model name
        select: ['name', 'slug']
      })
      .exec();

    if (!newsItem) {
      return NextResponse.json({
        success: false,
        message: 'News item not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      newsItem
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message
    });
  }
};
