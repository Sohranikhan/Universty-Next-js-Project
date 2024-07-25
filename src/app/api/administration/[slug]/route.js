import OfficeStaff from "../../../../models/administration/OfficeStaff";
import Office from "../../../../models/administration/Office";
import connect from "../../../../utils/connect";
import { NextResponse } from "next/server";

export const GET = async(request, searchParams)=>{
    await connect()
    const {params} = searchParams
    const {slug} = params
    try {
        const sepOffice = await Office.findOne({slug: slug}).populate({
            path: 'head',
            model: 'officeStaff'
        }).populate({
            path: 'staff',
            model: 'officeStaff',
        }).exec()
       if (sepOffice) {
        sepOffice.staff = sepOffice.staff.filter((stf)=> !stf._id.equals(sepOffice?.head?._id))
           return NextResponse.json({
               success: true,
               sepOffice,
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