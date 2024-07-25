import Office from "../../../../models/administration/Office";
import OfficeStaff from "../../../../models/administration/OfficeStaff";
import connect from "../../../../utils/connect"
import { NextResponse } from "next/server"

export const GET = async (request) => {
    await connect();
    try {
        const data = await OfficeStaff.find({}).populate({
            path: 'office',
            model: 'Office',
            select: 'title'
        }).exec();
        if (data) {
            return NextResponse.json({
                success: true,
                data
            })
        }

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
        const newOfficeStaff = new OfficeStaff({...data})
        if (newOfficeStaff) {   
            await newOfficeStaff.save()
            if (data?.office) {
                await Office.updateOne({_id: data.office},{$push:{staff: newOfficeStaff._id}})
            }
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
            message: error.message,
        })
    }
}

export const PATCH = async (request) => {
    await connect()
    try {
        const {id, ...data} = await request.json()
        await OfficeStaff.updateOne({_id: id},{$set:{...data}})
        if (data?.office) {
            await Office.updateOne({staff: id},{$pull:{staff: id}})
            await Office.updateOne({_id: data.office},{$push:{staff: id}})
        }
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