import Office from "../../../models/administration/Office";
import Staff from "../../../models/Faculty/Staff";
import connect from "../../../utils/connect"
import { NextResponse } from "next/server"

export const GET = async (request) => {
    await connect();
    try {
        const data = await Office.find({}).populate({
            path: 'head',
            model: 'officeStaff',
            select: ['name', 'slug']
        }).select('-description').exec();
        if (data) {
            return NextResponse.json({
                success: true,
                data
            })
        }
throw new Error("Database Error")
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: error.message,
        })

    }
}

export const POST = async (request) => {
    await connect()
    try {
        const data = await request.json()
        const newOffice = new Office({...data})
        await newOffice.save()
        return NextResponse.json({
            success: true,
            message: "Successfully Created"
        })
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: error.message,
        })
    }
}

export const PATCH = async (request) => {
    await connect()
    try {
        const {id, ...data} = await request.json()

        await Office.updateOne({_id: id},{$set:{...data}})
        return NextResponse.json({
            success: true,
            message: "Successfully Updated"
        })
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: error.message,
        })
    }
}