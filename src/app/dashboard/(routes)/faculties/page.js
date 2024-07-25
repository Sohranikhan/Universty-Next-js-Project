import BtnLink from "../../../../Components/BtnLink/BtnLink"
import Headings from "../../../../Components/Headings/Headings"
import { getFaculties } from "@/utils/getData"
import { BoxIcon } from "lucide-react"
import { FaBug } from "react-icons/fa"
import DataTable from "./Components/DataTable"


const facultiesPage = async () => {

    const data = await getFaculties()
    if (data.success && data?.faculties?.length <= 0) {
        return (
            <div className="w-full flex flex-col h-full items-center justify-center gap-y-2 sm:p-6 p-3 text-foreground">
                <div className="w-full flex items-center justify-between gap-2">
                    <p className="flex items-center gap-3 text-lg font-bold"><BoxIcon /> No Faculty Found </p>
                    <BtnLink text={'Create New'} href={'/dashboard/faculties/new'} />
                </div>
            </div>
        )
    }
    if (data?.success && data?.faculties?.length > 0) {
        return (
            <div className="w-full h-auto sm:p-6 p-3">
                <div className="flex items-center justify-between">
                    <Headings title={'Faculties'} des={'Faculties of MCUT'} />
                    <BtnLink text={'Create New'} href={'/dashboard/faculties/new'} />
                </div>
                            <DataTable data={data?.faculties} />
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

export default facultiesPage
