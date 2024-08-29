"use client"
import { HiMiniSquares2X2 } from "react-icons/hi2";
import { FaRegLightbulb } from "react-icons/fa";
import { HiDocumentChartBar } from "react-icons/hi2";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import SelectCategory from "./_components/SelectCategory";
import TopicDescription from "./_components/TopicDescription";
import SelectOption from "./_components/SelectOption";

const CreateCourse = () => {
    const StepperOptions = [
        {
            id: 1,
            name: "Category",
            icon: <HiMiniSquares2X2 />
        },
        {
            id: 2,
            name: "Topic & Desc",
            icon: <FaRegLightbulb />
        },
        {
            id: 3,
            name: "Options",
            icon: <HiDocumentChartBar />
        },
    ];
    const[activeIndex, setActiveIndex] = useState(0)

    return (
        <div>
            {/* Stepper */}
            <div className="flex flex-col items-center justify-center mt-10">
                <h2 className="text-2xl font-medium text-primary">Create Course</h2>
                <div className="flex mt-10">
                    {StepperOptions.map((item, index) => (
                        <div key={item.id} className="flex items-center">
                            <div className="flex flex-col items-center w-[50px] md:w-[100px]">
                                <div className={`p-3 text-white bg-gray-200 rounded-full ${activeIndex >= index && "bg-purple-500"}`}>
                                    {item.icon}
                                </div>
                                <h2 className="hidden md:block md:text-sm">{item.name}</h2>
                            </div>
                            {index !== StepperOptions.length - 1 && (
                                <div className={`h-1 w-[50px] md:w-[100px] lg:w-[170px] bg-gray-300 rounded-full ${activeIndex -1 >= index && "bg-purple-500"}`}></div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <div className="px-10 mt-10 md:px-20 lg:px-44">
            {/* components */}
            {activeIndex === 0 ? <SelectCategory/> : activeIndex === 1 ? <TopicDescription/> : <SelectOption/> }
            {/* next Previous  button */}
            <div className="flex justify-between mt-10">
            <Button disabled={activeIndex == 0 } onClick={()=>setActiveIndex(activeIndex - 1)}>Previous</Button>
           {activeIndex < 2 && <Button onClick={()=>setActiveIndex(activeIndex + 1)}>Next</Button>}
          { activeIndex === 2 && <Button onClick={()=>setActiveIndex(activeIndex + 1)}>
                Generate Course layout
            </Button> }
            </div>

            </div>
        </div>
    );
};

export default CreateCourse;
