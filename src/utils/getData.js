import Faculty from "../models/Faculty/Faculty"
import connect from "./connect"
import Department from "../models/Faculty/Department"
import Program from "../models/Faculty/Program"
import Staff from "../models/Faculty/Staff"
import Office from "../models/administration/Office"
import Directory from "../models/administration/Directory"
import OfficeStaff from "../models/administration/OfficeStaff"
import AboutMcut from "../models/aboutmcut/AboutMcut"
import MeritList from "../models/meritlist/MeritList"
import CampusLife from "../models/campusLife/CampusLife"
import Admission from "../models/admission/Admission"
import Download from "../models/downloads/Downloads"
import Category from "../models/news/Category"
import News from "../models/news/News"
import Tender from "../models/tender/Tender"

export const getFaculties = async()=>{
    await connect()
        try {
            const faculties = await Faculty.find({}).populate({
                path: 'dean',
                model: 'Staff',
            }).exec()
            if (faculties) {
                return{
                    success: true,
                    faculties
                }  
            }
            return{
                success: false,
                message: "Something went wrong"
            }
        } catch (error) {
            return{
                success: false,
                message: error.message
            }
        }
    }

export const getDepartments = async () => {
        await connect()
        try {
            const departments = await Department.find({}).populate({
                path: 'faculty',
                model: 'Faculty',
                select: 'name'
            }).populate({
                path: 'hod',
                model: 'Staff',
            }).exec();
            if (departments) {
                return {
                    success: true,
                    departments
                }
            }
            return {
                success: false,
                message: "Something went wrong"
            }
        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }

export const getPrograms = async () => {
        await connect()
        try {
            const programs = await Program.find({}).populate({
                path: 'department',
                model: 'Department',
                select: 'name'
            }).exec()
            if (programs) {
                return {
                    success: true,
                    programs
                }
            }
            return {
                success: false,
                message: "Something went wrong"
            }
        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }

export const getStaff = async () => {
        await connect()
        try {
            const staff = await Staff.find({}).populate({
                path: 'department',
                model: 'Department',
                select: 'name'
            }).exec()
            if (staff) {
                return {
                    success: true,
                    staff
                }
            }
            return {
                success: false,
                message: "Something went wrong"
            }
        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }

 export const getOffice = async ()=>{
    try {
        const data = await Office.find({}).populate({
            path: 'head',
            model: 'officeStaff',
            select: ['name', 'slug']
        }).exec()
        if (data) {
            return {
                success: true,
                data
            }
        }
        return {
            success: false,
            message: "Something went wrong"
        }
    } catch (error) {
        return {
            success: false,
            message: error.message
        }  
    }

 }   

 export const getDirectory = async ()=>{
    try {
        const data = await Directory.find({}).exec()
        if (data) {
            return {
                success: true,
                data
            }
        }
        return {
            success: false,
            message: "Something went wrong"
        }
    } catch (error) {
        return {
            success: false,
            message: error.message
        }  
    }

 }
 
 export const getOfficeStaff = async ()=>{
    try {
        const data = await OfficeStaff.find({}).populate({
            path: 'office',
            model: 'Office',
            select: 'title'
        }).exec()
        if (data) {
            return {
                success: true,
                data
            }
        }
        return {
            success: false,
            message: "Something went wrong"
        }
    } catch (error) {
        return {
            success: false,
            message: error.message
        }  
    }

 }

 export const getAboutMcut = async ()=>{
    try {
        const data = await AboutMcut.find({}).exec()
        if (data) {
            return {
                success: true,
                data
            }
        }
        return {
            success: false,
            message: "Something went wrong"
        }
    } catch (error) {
        return {
            success: false,
            message: error.message
        }  
    }

 }

 export const getMeritList = async ()=>{
    try {
        const data = await MeritList.find({}).populate({
            path:'program',
            model:'Program',
            select: ['name', 'slug']
        }).exec()
        if (data) {
            return {
                success: true,
                data
            }
        }
        return {
            success: false,
            message: "Something went wrong"
        }
    } catch (error) {
        return {
            success: false,
            message: error.message
        }  
    }

 }
 export const getCampusLife = async()=>{
    try {
        const data = await CampusLife.find({}).exec()
        if (data) {
            return {
                success: true,
                data
            }
        }
        return {
            success: false,
            message: "Something went wrong"
        }
    } catch (error) {
        return {
            success: false,
            message: error.message
        }  
    }
 }

 export const getAdmission = async()=>{
    try {
        const data = await Admission.find({}).exec()
        if (data) {
            return {
                success: true,
                data
            }
        }
        return {
            success: false,
            message: "Something went wrong"
        }
    } catch (error) {
        return {
            success: false,
            message: error.message
        }  
    }
 }

 export const getDownloads = async()=>{
    try {
        const data = await Download.find({}).exec()
        if (data) {
            return {
                success: true,
                data
            }
        }
        return {
            success: false,
            message: "Something went wrong"
        }
    } catch (error) {
        return {
            success: false,
            message: error.message
        }  
    }
 }

 export const getCategories = async()=>{
    try {
        const data = await Category.find({}).exec()
        if (data) {
            return {
                success: true,
                data
            }
        }
        return {
            success: false,
            message: "Something went wrong"
        }
    } catch (error) {
        return {
            success: false,
            message: error.message
        }  
    }
 }

 export const getNews = async()=>{
    try {
        const data = await News.find({}).populate({
            path: 'category',
            model: 'Category',
            select: 'name'
        }).exec()
        if (data) {
            return {
                success: true,
                data
            }
        }
        return {
            success: false,
            message: "Something went wrong"
        }
    } catch (error) {
        return {
            success: false,
            message: error.message
        }  
    }
 }

 export const getTenderData = async()=>{
    try {
        const data = await Tender.find({}).exec()
        if (data) {
            return {
                success: true,
                data
            }
        }
        return {
            success: false,
            message: "Something went wrong"
        }
    } catch (error) {
        return {
            success: false,
            message: error.message
        }  
    }
 }