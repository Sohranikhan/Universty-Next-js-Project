import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "../ui/table"
import Link from "next/link"

const FacultiesTable = ({data}) => {
  return (
    <Table>
                <TableCaption>
                    List of MCUT Teaching Staff
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">
                            #
                        </TableHead>
                        <TableHead>Faculty Name</TableHead>
                        <TableHead>Faculty Dean Name</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data && data?.map((faculty, index) => (
                        <TableRow key={faculty._id}>
                            <TableCell className="font-medium">{index + 1}</TableCell>
                            <TableCell><Link href={`/faculties/${faculty.slug}`}>{faculty.name}</Link></TableCell>
                            <TableCell><Link href={`/staff/${faculty?.dean?.slug}`}>{faculty?.dean?.name}</Link></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={2}>Totall Faculties</TableCell>
                        <TableCell className="text-center">{data && data.length}</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
  )
}

export default FacultiesTable