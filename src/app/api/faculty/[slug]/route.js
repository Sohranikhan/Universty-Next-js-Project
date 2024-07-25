import Department from "../../../../models/Faculty/Department";
import Faculty from "../../../../models/Faculty/Faculty";
import Staff from "../../../../models/Faculty/Staff";
import connect from "../../../../utils/connect";
import { NextResponse } from "next/server";

export const GET = async(request, searchParams)=>{
    await connect()
    const {params} = searchParams
    const {slug} = params
    try {
        const sepfaculty = await Faculty.findOne({slug: slug}).populate({
            path: 'dean',
            model: 'Staff',
            select: ['name', 'slug']
        }).populate({
            path: 'departments',
            model: 'Department',
            select: ['name', 'slug'],
            populate:{
                path: 'hod',
                model: "Staff",
                select: ['name','slug']
            }            
        }).exec()
        return NextResponse.json({
            success: true,
            sepfaculty
        })
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: error.message
        }) 
    }
}