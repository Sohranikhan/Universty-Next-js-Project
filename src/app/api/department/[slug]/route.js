import Faculty from "../../../../models/Faculty/Faculty";
import Department from "../../../../models/Faculty/Department";
import Staff from "../../../../models/Faculty/Staff";
import connect from "../../../../utils/connect";
import { NextResponse } from "next/server";

export const GET = async(request, searchParams)=>{
    await connect()
    const {params} = searchParams
    const {slug} = params
    try {
        const sepDepartment = await Department.findOne({slug: slug}).populate({
            path: 'faculty',
            model: 'Faculty',
            select: ['name', 'slug']
        }).populate({
            path: 'hod',
            model: 'Staff',
            select: ['name','slug']
        }).populate({
            path: 'staff',
            model: 'Staff',
        }).populate({
            path: 'programs',
            model: 'Program',
        }).exec();
        return NextResponse.json({
            success: true,
            sepDepartment
        })
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: error.message
        }) 
    }
}