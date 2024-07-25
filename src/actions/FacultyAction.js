"use server"

import Department from "../models/Faculty/Department"
import Faculty from "../models/Faculty/Faculty"
import Program from "../models/Faculty/Program"
import Staff from "../models/Faculty/Staff"
import { revalidatePath } from "next/cache"

export const deleteFaculty = async (formData) => {
    const id = formData.get('id')
    const path = formData.get('path')
    try {

        const departments = await Department.find({ faculty: id })
        if (departments.length != 0) {
            return {
                success: false,
                message: 'Faculty is not Empty, first delete all Departments in this Faculty'
            }
        }
        await Faculty.deleteOne({ _id: id })
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

export const deleteDepartment = async (formData) => {
    const id = formData.get('id')
    const path = formData.get('path')
    try {
        const remainStaff = await Staff.find({ department: id })
        const remainPrograms = await Program.find({ department: id })

        if (!remainStaff.length && !remainPrograms.length) {
            await Faculty.updateOne({ departments: id }, { $pull: { departments: id } })
            await Department.deleteOne({ _id: id })
            revalidatePath(path, 'page')
            return {
                success: true,
                message: "Successfully Deleted"
            }
        }
        return {
            success: false,
            message: 'Department is not Empty, first delete Programs and Staff from this department.'
        }
    } catch (error) {
        return {
            success: false,
            message: error.message
        }
    }
}

export const deleteProgram = async (formData) => {
    const id = formData.get('id')
    const path = formData.get('path')
    try {
        await Department.updateOne({ programs: id }, { $pull: { programs: id } })
        await Program.deleteOne({ _id: id })
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

export const deleteStaff = async (formData) => {
    const id = formData.get('id')
    const path = formData.get('path')
    try {
        await Department.updateOne({ staff: id }, { $pull: { staff: id } })
        await Staff.deleteOne({ _id: id })
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


