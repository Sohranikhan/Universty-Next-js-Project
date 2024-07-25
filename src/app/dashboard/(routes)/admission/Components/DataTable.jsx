import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "../../../../../Components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { Edit, Link2, MoreVertical } from "lucide-react"
import Link from "next/link"
import Confirm from "../../../../../Components/Confirm/Confirm"
import { deleteAdmissionPage } from "../../../../../actions/AdmissionAction"

const DataTable = async({data}) => {
    return (
        <div className="w-full h-auto overflow-x-scroll">
            <Table>
                <TableCaption>
                    List of MCUT Admission Pages
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">
                            #
                        </TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Last Update</TableHead>
                        <TableHead>Edit</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data && data?.map((admission, index) => (
                        <TableRow key={admission._id}>
                            <TableCell className="font-medium">{index + 1}</TableCell>
                            <TableCell><Link href={`/admission/${admission.slug}`}>{admission.title}</Link></TableCell>
                            <TableCell>{new Date(admission.updatedAt).toLocaleString()}</TableCell>
                            <TableCell className="overflow-visible">
                                <DropdownMenu>
                                    <DropdownMenuTrigger><MoreVertical /></DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-full bg-background rounded">
                                        <DropdownMenuItem className="w-full"><Link href={`/dashboard/admission/${admission._id}`} className="px-3 my-1 cursor-pointer flex items-center gap-2 py-1"><Edit size={18} /> Edit </Link>
                                        </DropdownMenuItem>
                                        
                                        <Confirm handler={deleteAdmissionPage} id={`${admission._id}`} path="/dashboard/admission" />
                                        <DropdownMenuItem className="px-3 my-1 cursor-pointer flex items-center gap-2 py-1"><Link2 size={18} /> Details</DropdownMenuItem>

                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={2}>Totall admission Pages</TableCell>
                        <TableCell className="text-center">{data && data.length}</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
            <p>{data?.message}</p>
        </div>
    )
}

export default DataTable