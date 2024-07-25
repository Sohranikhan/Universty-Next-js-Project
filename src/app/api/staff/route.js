import Staff from "../../../models/Faculty/Staff";
import Department from "../../../models/Faculty/Department";
import connect from "../../../utils/connect";

const { NextResponse } = require("next/server");

export const GET = async (request) => {
    await connect();
    try {
        const staffPersons = await Staff.find({}).populate({
            path: 'department',
            model: 'Department',
            select: ['name', 'slug']
        }).exec()
        return NextResponse.json({
            success: true,
            staff:staffPersons
        })
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: error.message
        })
    }
}

export const POST = async (request) => {
    const data = await request.json()
    try {
        const newStaff = new Staff({...data})
        if (newStaff) {
            await Department.updateOne({ _id: data.department }, { $push: { staff: newStaff._id } })
            await newStaff.save()
            return NextResponse.json({
                success: true,
                message: "Successfully Created"
            })
        }
        return NextResponse.json({
            success: false,
            message: "Something went wrong"
        })
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: error.message
        })
    }
}

export const PATCH = async (request) => {
    const {id, ...data } = await request.json()
    try {
        // push pull dep from faculty
        await Staff.updateOne({ _id: id }, { $set: {...data} })
        await Department.updateOne({ staff: id }, { $pull: { staff: id } })
        await Department.updateOne({ _id: data.department }, { $push: { staff: id } })

        return NextResponse.json({
            success: true,
            message: "Successfully Updated"
        })
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: error.message
        })
    }
}
