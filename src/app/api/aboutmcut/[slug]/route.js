import AboutMcut from "../../../../models/aboutmcut/AboutMcut";
import connect from "../../../../utils/connect";
import { NextResponse } from "next/server";


export const GET = async(request, searchParams)=>{
    await connect()
    const {params} = searchParams
    const {slug} = params
    try {
        const sepAbout = await AboutMcut.findOne({slug: slug}).exec()
       if (sepAbout) {
           return NextResponse.json({
               success: true,
               sepAbout,
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