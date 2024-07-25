import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "../../../../../Components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { Edit, Link2, MoreVertical, UserPlus2 } from "lucide-react"
import Link from "next/link"
import Confirm from "../../../../../Components/Confirm/Confirm"
import { deleteOffice } from "../../../../../actions/OfficeAction"

const DataTable = async({data}) => {
    return (
        <div className="w-full h-auto overflow-x-scroll">
            <Table>
                <TableCaption>
                    List of MCUT Administrations
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">
                            #
                        </TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Head Name</TableHead>
                        <TableHead>Edit</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data && data?.map((office, index) => (
                        <TableRow key={office._id}>
                            <TableCell className="font-medium">{index + 1}</TableCell>
                            <TableCell><Link href={`/administration/${office.slug}`}>{office.title}</Link></TableCell>
                            <TableCell>{office?.head?.name}</TableCell>
                            <TableCell className="overflow-visible">
                                <DropdownMenu>
                                    <DropdownMenuTrigger><MoreVertical /></DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-full bg-background rounded">
                                        <DropdownMenuItem className="w-full"><Link href={`/dashboard/administration/${office._id}`} className="px-3 my-1 cursor-pointer flex items-center gap-2 py-1"><Edit size={18} /> Edit </Link>
                                        </DropdownMenuItem>

                                        <DropdownMenuItem className="w-full"><Link href={`/dashboard/administration/adminstaff/new`} className="px-3 my-1 cursor-pointer flex items-center gap-2 py-1"><UserPlus2 size={18} /> Add Staff </Link>
                                        </DropdownMenuItem>
                                        
                                        <Confirm handler={deleteOffice} id={`${office._id}`} path="/dashboard/office" />
                                        <DropdownMenuItem className="px-3 my-1 cursor-pointer flex items-center gap-2 py-1"><Link2 size={18} /> Details</DropdownMenuItem>

                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={3}>Totall Administrations</TableCell>
                        <TableCell className="text-center">{data && data.length}</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
            <p>{data?.message}</p>
        </div>
    )
}

export default DataTable