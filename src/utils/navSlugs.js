import CampusLife from "models/campusLife/CampusLife";
import Faculty from "../models/Faculty/Faculty";
import Office from "../models/administration/Office";
import AboutMcut from "../models/aboutmcut/AboutMcut";
import Admission from "../models/admission/Admission";
import connect from "./connect";

export const faculties = async () => {
    await connect()
    try {
      const id = await Faculty.find().select(['slug','name'])
      if (id) {
        return {
          success: true,
          data: id
        }
      }
    } catch (error) {
      return {
        success: false,
        message: error.message
      }
    }
  }
 export const administration = async () => {
    await connect()
    try {
      const id = await Office.find().select(['slug','title'])
      if (id) {
        return {
          success: true,
          data: id
        }
      }
    } catch (error) {
      return {
        success: false,
        message: error.message
      }
    }
  }
 export const aboutMcut = async () => {
    await connect()
    try {
      const id = await AboutMcut.find().select(['slug','title'])
      if (id) {
        return {
          success: true,
          data: id
        }
      }
    } catch (error) {
      return {
        success: false,
        message: error.message
      }
    }
  }
 export const admissionF = async () => {
    await connect()
    try {
      const id = await Admission.find().select(['slug','title'])
      if (id) {
        return {
          success: true,
          data: id
        }
      }
    } catch (error) {
      return {
        success: false,
        message: error.message
      }
    }
  }
 export const campusLifeF = async () => {
    await connect()
    try {
      const id = await CampusLife.find().select(['slug','title'])
      if (id) {
        return {
          success: true,
          data: id
        }
      }
    } catch (error) {
      return {
        success: false,
        message: error.message
      }
    }
  }