"use server"

import MeritList from "../models/meritlist/MeritList";
import connect from "../utils/connect";
import { revalidatePath } from "next/cache";

export async function deleteMeritList(formData) {
    await connect();
    const id = formData.get('id')
    const path = formData.get('path')
    try {
        await MeritList.findByIdAndDelete(id);
        revalidatePath(path, 'page')
        return {
            success: true,
            message: "Successfully Deleted"
        }
    } catch (error) {
        return {
            success: false,
            message: error.message
        }
    }
  }