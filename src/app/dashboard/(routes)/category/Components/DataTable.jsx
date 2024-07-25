import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "../../../../../Components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Edit, MoreVertical } from "lucide-react";
import Link from "next/link";
import Confirm from "../../../../../Components/Confirm/Confirm";
import { deleteCategory } from "../../../../../actions/CategoryAction";  // Adjust to your action file

const DataTable = ({ data }) => {
  return (
    <div className="w-full h-auto">
      <Table>
        <TableCaption>List of Categories</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">#</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Edit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((category, index) => (
            <TableRow key={category._id}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{category.name}</TableCell>
              <TableCell className="overflow-visible">
                <DropdownMenu>
                  <DropdownMenuTrigger><MoreVertical /></DropdownMenuTrigger>
                  <DropdownMenuContent className="w-full bg-background rounded">
                    <DropdownMenuItem className="w-full">
                      <Link href={`/dashboard/category/${category._id}`} className="px-3 my-1 cursor-pointer flex items-center gap-2 py-1">
                        <Edit size={18} /> Edit
                      </Link>
                    </DropdownMenuItem>
                    <Confirm handler={deleteCategory} id={`${category._id}`} path="/dashboard/category" />
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2}>Total Categories</TableCell>
            <TableCell className="text-center">{data.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default DataTable;
