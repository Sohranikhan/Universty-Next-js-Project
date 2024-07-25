
import Admission from "../../../../models/admission/Admission";
import connect from "../../../../utils/connect";
import { NextResponse } from "next/server";


export const GET = async(request, searchParams)=>{
    await connect()
    const {params} = searchParams
    const {slug} = params
    try {
        const sepAdmission = await Admission.findOne({slug: slug}).exec()
       if (sepAdmission) {
           return NextResponse.json({
               success: true,
               sepAdmission,
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