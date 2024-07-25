import CampusLife from "../../../models/campusLife/CampusLife";
import connect from "../../../utils/connect";
import { NextResponse } from "next/server";

export const GET = async (request) => {
    await connect();
    try {
        const data = await CampusLife.find({}).select('-description').exec();
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

export const POST = async(request)=>{
    const {title ,newdescription, slug} = await request.json()
    try {
       const newCampus = new CampusLife({title ,description: newdescription, slug});
       await newCampus.save()
       if (newCampus) {
        return NextResponse.json({
            success: true,
            message: "Successfully Updated"
        })
       }
       return NextResponse.json({
        success: false,
        message: "Something Went Wrong"
    })
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: error.message
        })
    }
}

export const PATCH = async (request) => {
    await connect()
    try {
        const { title, newdescription, id } = await request.json()
        await CampusLife.updateOne({_id: id},{$set:{ title, description: newdescription, id }})
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