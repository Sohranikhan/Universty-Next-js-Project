import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "../../../../../Components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Edit, Link2, MoreVertical } from "lucide-react";
import Link from "next/link";
import Confirm from "../../../../../Components/Confirm/Confirm";
import { deleteDownload } from "../../../../../actions/DownloadAction"; // Ensure you have this function for downloads

const DataTable = async({ data }) => {
    return (
        <div className="w-full h-auto">
            <Table>
                <TableCaption>
                    List of Downloads
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
                    {data && data?.map((download, index) => (
                        <TableRow key={download._id}>
                            <TableCell className="font-medium">{index + 1}</TableCell>
                            <TableCell>{download.title}</TableCell>
                            <TableCell>
                                <a href={download.url} target="_blank" rel="noopener noreferrer">{download.url}</a>
                            </TableCell>
                            <TableCell className="overflow-visible">
                                <DropdownMenu>
                                    <DropdownMenuTrigger><MoreVertical /></DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-full bg-background rounded">
                                        <DropdownMenuItem className="w-full">
                                            <Link href={`/dashboard/downloads/${download._id}`} className="px-3 my-1 cursor-pointer flex items-center gap-2 py-1">
                                                <Edit size={18} /> Edit
                                            </Link>
                                        </DropdownMenuItem>
                                        <Confirm handler={deleteDownload} id={`${download._id}`} path="/dashboard/downloads" />
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
                        <TableCell colSpan={3}>Total Downloads</TableCell>
                        <TableCell className="text-center">{data && data.length}</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
            <p>{data?.message}</p>
        </div>
    );
};

export default DataTable;
