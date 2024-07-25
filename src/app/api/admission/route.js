
import Admission from "../../../models/admission/Admission";
import connect from "../../../utils/connect";
import { NextResponse } from "next/server";

export const GET = async (request) => {
    await connect();
    try {
        const data = await Admission.find({}).select('-description').exec();
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
       const newAdmission = new Admission({title ,description: newdescription, slug});
       await newAdmission.save()
       if (newAdmission) {
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
        await Admission.updateOne({_id: id},{$set:{ title, description: newdescription, id }})
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