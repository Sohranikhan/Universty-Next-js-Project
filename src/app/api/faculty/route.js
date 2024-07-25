import Faculty from "../../../models/Faculty/Faculty";
import Staff from "../../../models/Faculty/Staff";
import connect from "../../../utils/connect";
const { NextResponse } = require("next/server");

export const GET = async(request)=>{
    await connect();
    try {
        const data = await Faculty.find({}).populate({
            path: 'dean',
            model: 'Staff',
            select: ['name', 'slug']
        }).select('-description').exec();
        return NextResponse.json({
            success: true,
            data
        })
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: error.message
        }) 
    }
}
export const POST = async(request) =>{
    const data= await request.json()
    try {
    const newFaculty = new Faculty({
        name: data.facultyname,
        dean: data.dean,
        description: data.newdescription,
        slug: data.slug
    })
    await newFaculty.save()
    return NextResponse.json({
        success: true,
        message: "Successfully Created"
    })
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: error.message
        })
    }
}

export const PATCH = async(request)=>{
    const data= await request.json()
    try {
    await Faculty.updateOne({_id: data.id},{$set:{name: data.facultyname,dean: data.dean, description: data.newdescription}})
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
