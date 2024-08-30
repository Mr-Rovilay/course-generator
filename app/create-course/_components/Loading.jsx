import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import Image from "next/image"
  

const Loading = ({loading}) => {
  return (
    <AlertDialog open={loading}>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogDescription>
         <div className="flex flex-col items-center py-10">
            <Image src={"/loader.gif"} width={100} height={100}/>
            <h2 className="">Please wait... Ai working on your course</h2>
         </div>
        </AlertDialogDescription>
      </AlertDialogHeader>
    </AlertDialogContent>
  </AlertDialog>
  
  )
}

export default Loading