import BtnLink from "../../../../../Components/BtnLink/BtnLink"
import Headings from "../../../../../Components/Headings/Headings"
import { getOfficeStaff } from "@/utils/getData"
import { BoxIcon } from "lucide-react"
import { FaBug } from "react-icons/fa"
import DataTable from "./Components/DataTable"


const staffPage = async () => {

    const data = await getOfficeStaff()
    if (data.success && data?.data?.length <= 0) {
        return (
            <div className="w-full flex flex-col h-full items-center justify-center gap-y-2 sm:p-6 p-3 text-foreground">
                <div className="w-full flex items-center justify-between gap-2">
                    <p className="flex items-center gap-3 text-lg font-bold"><BoxIcon /> No Administration staff Found </p>
                    <BtnLink text={'Create New'} href={'/dashboard/administration/adminstaff/new'} />
                </div>
            </div>
        )
    }
    if (data?.success && data?.data?.length > 0) {
        return (
            <div className="w-full h-auto sm:p-6 p-3">
                <div className="flex items-center justify-between">
                    <Headings title={'Administration Staff'} des={'Administrations Staff of MCUT'} />
                    <BtnLink text={'Create New'} href={'/dashboard/administration/adminstaff/new'} />
                </div>
     <DataTable data={data?.data} />
            </div>
        )
    } else {
        return (
            <div className="w-full flex flex-col h-full items-center justify-center gap-y-2 sm:m-6 m-3">
                <div className="flex flex-col items-center justify-center gap-2">
                    <FaBug />
                    <p className="text-2xl text-foreground">{data.message}</p>
                </div>
            </div>
        )
    }
}

export default staffPage


