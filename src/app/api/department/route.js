import Department from "../../../models/Faculty/Department";
import Faculty from "../../../models/Faculty/Faculty";
import Staff from "../../../models/Faculty/Staff";
import connect from "../../../utils/connect";

const { NextResponse } = require("next/server");

export const GET = async(request)=>{
    await connect();
    try {
        const departments = await Department.find({}).populate({
            path: 'faculty',
            model: 'Faculty',
            select: ['name', 'slug']
        }).populate({
            path: 'hod',
            model: 'Staff',
            select: ['name','slug']
        }).exec();
        return NextResponse.json({
            success: true,
            departments
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
    const newDepartment = new Department({...data})
    if (newDepartment) {
        await newDepartment.save()
            await Faculty.updateOne({_id: data.faculty},{$push:{departments: newDepartment._id}})
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
export const PATCH = async(request)=>{
    const {id, ...data}= await request.json()

    try {
    // push pull dep from faculty
        await Department.updateOne({_id: id},{$set:{...data}})
        await Faculty.updateOne({departments: id},{$pull:{departments: id}})
        await Faculty.updateOne({_id: data.faculty},{$push:{departments: id}})

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
