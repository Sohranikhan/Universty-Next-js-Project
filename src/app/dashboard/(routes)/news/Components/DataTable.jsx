import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "../../../../../Components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Edit, MoreVertical } from "lucide-react";
import Link from "next/link";
import Confirm from "../../../../../Components/Confirm/Confirm";
import { deleteNews } from "../../../../../actions/NewsAction";  // Adjust to your action file

const DataTable = ({ data }) => {
  return (
    <div className="w-full h-auto">
      <Table>
        <TableCaption>List of News Articles</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">#</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((news, index) => (
            <TableRow key={news._id}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{news.title}</TableCell>
              <TableCell>{news?.category?.name}</TableCell>
              <TableCell className="overflow-visible">
                <DropdownMenu>
                  <DropdownMenuTrigger><MoreVertical /></DropdownMenuTrigger>
                  <DropdownMenuContent className="w-full bg-background rounded">
                    <DropdownMenuItem className="w-full">
                      <Link href={`/dashboard/news/${news._id}`} className="px-3 my-1 cursor-pointer flex items-center gap-2 py-1">
                        <Edit size={18} /> Edit
                      </Link>
                    </DropdownMenuItem>
                    <Confirm handler={deleteNews} id={`${news._id}`} path="/dashboard/news" />
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total News Articles</TableCell>
            <TableCell className="text-center">{data.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default DataTable;
