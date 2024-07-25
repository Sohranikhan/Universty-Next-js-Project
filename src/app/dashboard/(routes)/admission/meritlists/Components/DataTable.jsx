import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "../../../../../../Components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { Edit, Link2, MoreVertical } from "lucide-react"
import Link from "next/link"
import Confirm from "../../../../../../Components/Confirm/Confirm"
import { deleteMeritList } from "../../../../../../actions/MeritList"

const DataTable = async({data}) => {
    return (
        <div className="w-full h-auto overflow-x-scroll">
            <Table>
                <TableCaption>
                    Merit Lists
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">
                            #
                        </TableHead>
                        <TableHead>Program</TableHead>
                        <TableHead>Pdf Url</TableHead>
                        <TableHead>Edit</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data && data?.map((merit, index) => (
                        <TableRow key={merit._id}>
                            <TableCell className="font-medium">{index + 1}</TableCell>
                            <TableCell>{merit?.program?.name}</TableCell>
                            <TableCell><Link href={merit?.pdfUrl}>{merit.pdfUrl}</Link></TableCell>
                            <TableCell className="overflow-visible">
                                <DropdownMenu>
                                    <DropdownMenuTrigger><MoreVertical /></DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-full bg-background rounded">
                                        <DropdownMenuItem className="w-full"><Link href={`/dashboard/admission/meritlists/${merit._id}`} className="px-3 my-1 cursor-pointer flex items-center gap-2 py-1"><Edit size={18} /> Edit </Link>
                                        </DropdownMenuItem>
                                        
                                        <Confirm handler={deleteMeritList} id={`${merit._id}`} path="/dashboard/admission/meritlist" />
                                        <DropdownMenuItem className="px-3 my-1 cursor-pointer flex items-center gap-2 py-1"><Link2 size={18} /> Details</DropdownMenuItem>

                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={2}>Totall Merit Lists</TableCell>
                        <TableCell className="text-center">{data.data && data.data.length}</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
            <p>{data?.message}</p>
        </div>
    )
}

export default DataTable