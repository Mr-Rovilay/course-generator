import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  

const SelectOption = () => {
  return (
    <div className="px-10 md:px-20 lg:px-44"> 
        <div className="grid grid-cols-2 gap-10">
            <div className="">
                <label htmlFor="" className="text-sm">Difficult Level</label>

        <Select>
  <SelectTrigger className="">
    <SelectValue placeholder="Select" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="Beginner">Beginner</SelectItem>
    <SelectItem value="Intermediate">Intermediate</SelectItem>
    <SelectItem value="Advance">Advance</SelectItem>
  </SelectContent>
</Select>

            </div>

        </div>
    </div>
  )
}

export default SelectOption
