"use client"
import { useEffect, useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "../../../../Components/ui/table"

const TableComponenet = () => {
    const [meritList, setMeritList] = useState([]);

    useEffect(() => {
      const fetchMeritList = async () => {
        try {
          const res = await fetch('https://mcut.vercel.app/api/admission/meritlist');
          const data = await res.json()
          setMeritList(data);
        } catch (error) {
          console.error('Error fetching the merit list:', error);
        }
      };
  
      fetchMeritList();
    }, []);

  return (
    <div className="w-full h-auto overflow-x-scroll">
            <Table>
                <TableCaption>
                    List of Merit Lists
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">
                            #
                        </TableHead>
                        <TableHead>Program</TableHead>
                        <TableHead>URL</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {meritList && meritList.success && meritList?.meritList?.data?.map((merit, index) => (
                        <TableRow key={merit._id}>
                            <TableCell className="font-medium">{index + 1}</TableCell>
                            <TableCell>{merit?.program?.name}</TableCell>
                            <TableCell>{merit.pdfUrl}</TableCell>
                            </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={2}>Totall Lists</TableCell>
                        <TableCell className="text-center">{meritList && meritList?.meritList?.length}</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
            <p>{meritList?.message}</p>
        </div>
  )
}

export default TableComponenet