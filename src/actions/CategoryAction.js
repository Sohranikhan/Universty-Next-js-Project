"use server"

import Category from "../models/news/Category";
import News from "../models/news/News";
import connect from "../utils/connect";
import { revalidatePath } from "next/cache";

export const deleteCategory = async (formData) => {
    await connect();
    const id = formData.get('id');
    const path = formData.get('path');
    
    try {
        // First, remove the category
        await Category.findByIdAndDelete(id);

        // Optionally, you may want to handle news items related to this category
        await News.updateMany({ category: id }, { $unset: { category: "" } });

        // Revalidate the path to refresh the data
        revalidatePath(path, 'page');

        return {
            success: true,
            message: "Category successfully deleted"
        };
    } catch (error) {
        return {
            success: false,
            message: error.message
        };
    }
};
