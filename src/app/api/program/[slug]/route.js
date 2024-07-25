import Program from "../../../../models/Faculty/Program";
import Department from "../../../../models/Faculty/Staff";
import connect from "../../../../utils/connect";
import { NextResponse } from "next/server";

export const GET = async(request, searchParams)=>{
    await connect();
    const {params} = searchParams
    const {slug} = params
    try {
        const sepProgram = await Program.findOne({slug: slug}).populate({
            path: 'department',
            model: 'Department',
            select: ['name', 'slug']
        }).exec()
        return NextResponse.json({
            success: true,
            sepProgram
        })
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: error.message
        }) 
    }
}