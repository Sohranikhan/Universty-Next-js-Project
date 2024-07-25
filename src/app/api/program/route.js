import Program from "../../../models/Faculty/Program";
import Department from "../../../models/Faculty/Department";
import connect from "../../../utils/connect";
import Faculty from "../../../models/Faculty/Faculty";
const { NextResponse } = require("next/server");

export const GET = async(request)=>{
    await connect();
    try {
        const programs = await Program.find({}).populate({
            path: 'department',
            model: 'Department',
            select: ['name', 'slug', 'faculty'],
            populate:{
                path: 'faculty',
                model: 'Faculty',
                select: ['name','slug']
            }
        }).exec()
        return NextResponse.json({
            success: true,
            programs
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
    const newProgram = new Program({
        name: data.programname,
        department: data.department,
        description: data.newdescription,
        slug: data.slug
    })
    if (newProgram) {
        await Department.updateOne({_id: data.department},{$push:{programs: newProgram._id}})
        await newProgram.save()
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
    const data= await request.json()
    try {
    // push pull dep from faculty
    await Department.updateOne({programs: data.id},{$pull:{programs: data.id}})
    await Department.updateOne({_id: data.department},{$push:{programs: data.id}})

    await Program.updateOne({_id: data.id},{$set:{name: data.programname, department: data.department, description: data.newdescription}})
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
