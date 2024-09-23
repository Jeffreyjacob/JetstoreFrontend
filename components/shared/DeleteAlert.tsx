import React, { useState } from 'react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog'
import { Button } from '../ui/button'
import { Trash } from 'lucide-react'

type Props = {
    onDelete:(id:string)=>void
    id:string
    title:string,
    isDeleting:boolean
}

const DeleteAlert = ({onDelete,id,title,isDeleting}:Props) => {
      const [open,setOpen] = useState(false)
    const handleDelete = async ()=>{
      await onDelete(id)
       setOpen(false)
    }
    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Button  className='flex gap-1'>
                    <Trash className='w-4 h-4 text-white'/>
                      delete
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete this {title}.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Button 
                     onClick={handleDelete} disabled={isDeleting}>
                        {isDeleting ? " Deleting":" Continue"}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    )
}

export default DeleteAlert