"use client";
import { UserInputContext } from "@/app/_context/UserInputContext";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useContext } from "react";

const SelectOption = () => {
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);

  const handleInputChange = (fieldName, value) => {
    setUserCourseInput((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  return (
    <div className="md:px-20 lg:px-44">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <div className="">
          <label htmlFor="level" className="text-sm">
            Difficulty Level
          </label>

          <Select onValueChange={(value) => handleInputChange("level", value)} defaultValue={userCourseInput?.level} >
            <SelectTrigger className="text-lg h-14 ring-0 focus:ring-0">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Beginner">Beginner</SelectItem>
              <SelectItem value="Intermediate">Intermediate</SelectItem>
              <SelectItem value="Advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="">
          <label htmlFor="duration" className="text-sm">
            Course Duration
          </label>

          <Select onValueChange={(value) => handleInputChange("duration", value)} defaultValue={userCourseInput?.duration}>
            <SelectTrigger className="text-lg h-14 ring-0 focus:ring-0">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1 Hour">1 Hour</SelectItem>
              <SelectItem value="2 Hours">2 Hours</SelectItem>
              <SelectItem value="More than 3 Hours">More than 3 Hours</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="">
          <label htmlFor="displayVideo" className="text-sm">
            Add Video
          </label>

          <Select onValueChange={(value) => handleInputChange("displayVideo", value)} defaultValue={userCourseInput?.displayVideo}>
            <SelectTrigger className="text-lg h-14 ring-0 focus:ring-0">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Yes">Yes</SelectItem>
              <SelectItem value="No">No</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="">
          <label htmlFor="noOfChapter" className="text-sm ">
            Number of Chapters
          </label>
          <Input
            type="number"
            onChange={(event) => handleInputChange("noOfChapter", event.target.value)}
            defaultValue={userCourseInput?.noOfChapter}
            className="text-lg h-14 ring-0 focus:ring-0"
          />
        </div>
      </div>
    </div>
  );
};

export default SelectOption;
