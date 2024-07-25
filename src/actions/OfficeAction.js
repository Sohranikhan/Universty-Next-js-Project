"use server"
import Office from "../models/administration/Office"
import OfficeStaff from "../models/administration/OfficeStaff"
import { revalidatePath } from "next/cache"

export const deleteOffice = async (formData) => {
    const id = formData.get('id')
    const path = formData.get('path')
    try {
        await Office.deleteOne({_id: id});
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

export const deleteOfficeStaff = async (formData) => {
    const id = formData.get('id')
    const path = formData.get('path')
    try {
        await OfficeStaff.deleteOne({_id: id});
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

