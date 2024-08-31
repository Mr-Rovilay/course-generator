"use client"
import { HiMiniSquares2X2 } from "react-icons/hi2";
import { FaRegLightbulb } from "react-icons/fa";
import { HiDocumentChartBar } from "react-icons/hi2";
import { Button } from "@/components/ui/button";
import { useContext, useEffect, useState } from "react";
import SelectCategory from "./_components/SelectCategory";
import TopicDescription from "./_components/TopicDescription";
import SelectOption from "./_components/SelectOption";
import { UserInputContext } from "../_context/UserInputContext";
import { CourseList } from "@/configs/Schema";
import { GenerateCourseLayout_AI } from "@/configs/aimodel";
import Loading from "./_components/Loading";
import { db } from "@/configs/db";
import uuid4 from "uuid4";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const CreateCourse = () => {
    const [loading, setLoading] = useState(false);
    const {user} = useUser()
    const router = useRouter()
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
    const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);
    useEffect(()=>{
        console.log(userCourseInput)
    },[userCourseInput])
    // used to check thee enabldbe or disalbe button
    const checkStatus = ()=> {
        if(userCourseInput?.length === 0){
            return true
        }
        if(activeIndex==0&&(userCourseInput?.category?.length == 0 ||userCourseInput?.category == undefined))
        {
            return true
        }
        if (activeIndex===1&&(userCourseInput?.topic?.length == 0 || userCourseInput?.topic == undefined)) {
          return true  
        }
        else if (activeIndex===2&&(userCourseInput?.level == undefined || userCourseInput?.duration== undefined || userCourseInput?.displayVideo == undefined || userCourseInput?.noOfChapter==undefined)){
            return true     
        }
        return false
    }
    const GenerateCourseLayout = async () => {
        setLoading(true);
        try {
            const BASIC_PROMPT = "Generate A Course Tutorial on Following Details with Fields as Course Name, Description, Along With Chapter Name, about, Duration: ";
            const USER_INPUT_PROMPT = `Category: ${userCourseInput?.category}, Topic: ${userCourseInput?.topic}, Level: ${userCourseInput?.level}, Duration: ${userCourseInput?.duration}, NoOfChapters: ${userCourseInput?.noOfChapter}, in JSON format`;
            const FINAL_PROMPT = BASIC_PROMPT + USER_INPUT_PROMPT;
            console.log(FINAL_PROMPT)
    
            const result = await GenerateCourseLayout_AI.sendMessage(FINAL_PROMPT);
    
            const courseLayoutText =  result.response?.text();
            console.log(courseLayoutText); // Log the raw text response for debugging
    
            // Parse the result and handle any potential issues
            let courseLayout;
            try {
                courseLayout = JSON.parse(courseLayoutText);
            } catch (error) {
                console.error("Error parsing course layout:", error);
                courseLayout = {}; // Assign an empty object or handle this scenario as needed
            }
    
            // Check if the courseLayout is valid
            if (courseLayout && Object.keys(courseLayout).length > 0) {
                await SaveCourseLayoutInDb(courseLayout);
            } else {
                console.error("Invalid course layout received.");
            }
        } catch (error) {
            console.error("Error generating course layout:", error);
        } finally {
            setLoading(false);
        }
    };
    
    const SaveCourseLayoutInDb = async (courseLayout) => {
        try {
            var id = uuid4();
            setLoading(true)
            const result = await db.insert(CourseList).values({
                courseId: id,
                name: userCourseInput?.topic,
                level: userCourseInput?.level,
                category: userCourseInput?.category,
                courseOutput: courseLayout, // Ensure this is not null
                createdBy: user?.primaryEmailAddress?.emailAddress,
                userName: user?.fullName,
                userProfileImage: user?.imageUrl,
            });
            console.log("Course saved successfully:", result);
            setLoading(false)
            router.replace("/create-course/"+id)
        } catch (error) {
            console.error("Error saving course layout in DB:", error);
        }
    };
    

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
            <Button disabled={activeIndex == 0 } variant="outline" onClick={()=>setActiveIndex(activeIndex - 1)}>Previous</Button>
           {activeIndex < 2 && <Button disabled={checkStatus()} onClick={()=>setActiveIndex(activeIndex + 1)}>Next</Button>}
          { activeIndex === 2 && <Button disabled={checkStatus()} onClick={()=> GenerateCourseLayout()}>
                Generate Course
            </Button> }
            </div>

            </div>
            <Loading loading={loading}/>
        </div>
    );
};

export default CreateCourse;
