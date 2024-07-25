"use client"
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, AlertDialogCancel } from "../ui/alert-dialog"
import { Delete } from "lucide-react"

const Confirm = ({handler, id, path}) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger className="px-3 cursor-pointer flex items-center gap-2 py-1">
                <Delete size={18} /> Delete
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are You Want to Delete This?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanent DELETE this data from database.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <form action={async(formData)=>{
                        const res = await handler(formData);
                        if (res.success) {
                            alert('Successfully Deleted')
                        }else{
                            alert(res.message)
                        }
                    }}>
                     <input type="text" name="id" defaultValue={`${id}`} hidden />
                     <input type="text" name="path" defaultValue={path} hidden />
                    <AlertDialogAction type="submit" className="w-full">Delete</AlertDialogAction>
                    </form>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default Confirm