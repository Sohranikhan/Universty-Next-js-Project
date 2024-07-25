"use server"

import Download from "../models/downloads/Downloads";
import connect from "../utils/connect"
import { revalidatePath } from "next/cache";

export const deleteDownload = async (formData) => {
    await connect();
    const id = formData.get('id')
    const path = formData.get('path')
    try {
        await Download.deleteOne({ _id: id })
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
