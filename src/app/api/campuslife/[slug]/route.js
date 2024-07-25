import CampusLife from "../../../../models/campusLife/CampusLife";
import connect from "../../../../utils/connect";
import { NextResponse } from "next/server";


export const GET = async(request, searchParams)=>{
    await connect()
    const {params} = searchParams
    const {slug} = params
    try {
        const sepCampus = await CampusLife.findOne({slug: slug}).exec()
       if (sepCampus) {
           return NextResponse.json({
               success: true,
               sepCampus,
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