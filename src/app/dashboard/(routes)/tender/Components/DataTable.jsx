import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "../../../../../Components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Edit, Link2, MoreVertical } from "lucide-react";
import Link from "next/link";
import Confirm from "../../../../../Components/Confirm/Confirm";
import { deleteTender } from "../../../../../actions/TenderAction"; // Ensure you have this function for tenders

const DataTable = async({ data }) => {
    return (
        <div className="w-full h-auto">
            <Table>
                <TableCaption>
                    List of Tenders
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">
                            #
                        </TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>URL</TableHead>
                        <TableHead>Edit</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data && data?.map((tender, index) => (
                        <TableRow key={tender._id}>
                            <TableCell className="font-medium">{index + 1}</TableCell>
                            <TableCell>{tender.title}</TableCell>
                            <TableCell>
                                <a href={tender.url} target="_blank" rel="noopener noreferrer">{tender.url}</a>
                            </TableCell>
                            <TableCell className="overflow-visible">
                                <DropdownMenu>
                                    <DropdownMenuTrigger><MoreVertical /></DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-full bg-background rounded">
                                        <DropdownMenuItem className="w-full">
                                            <Link href={`/dashboard/tender/${tender._id}`} className="px-3 my-1 cursor-pointer flex items-center gap-2 py-1">
                                                <Edit size={18} /> Edit
                                            </Link>
                                        </DropdownMenuItem>
                                        <Confirm handler={deleteTender} id={`${tender._id}`} path="/dashboard/tender" />
                                        <DropdownMenuItem className="px-3 my-1 cursor-pointer flex items-center gap-2 py-1">
                                            <Link2 size={18} /> Details
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={3}>Total Tenders</TableCell>
                        <TableCell className="text-center">{data && data.length}</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
            <p>{data?.message}</p>
        </div>
    );
};

export default DataTable;
