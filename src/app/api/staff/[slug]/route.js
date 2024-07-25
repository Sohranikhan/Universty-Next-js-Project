import Department from "../../../../models/Faculty/Department";
import Staff from "../../../../models/Faculty/Staff";
import connect from "../../../../utils/connect";
import { NextResponse } from "next/server";

export const GET = async(request, searchParams)=>{
    await connect()
    const {params} = searchParams
    const {slug} = params
    try {
        const sepStaff = await Staff.findOne({slug: slug}).populate({
            path: 'department',
            model: 'Department',
            select: ['name', 'slug']
        }).exec()
        return NextResponse.json({
            success: true,
            sepStaff
        })
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: error.message
        }) 
    }
}