"use client";
import React, { useContext } from "react";
import Image from "next/image";
import CategoryList from "@/app/_shared/CategoryList";
import { UserInputContext } from "@/app/_context/UserInputContext";

const SelectCategory = () => {
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);

  const handleCategoryChange = (category) => {
    setUserCourseInput((prev) => ({
      ...prev,
      category: category,
    }));
  };

  return (
    <div className="px-10 md:px-20">
      <h2 className="my-5">Select the Course Category</h2>
      <div className="grid grid-cols-3 gap-10">
        {CategoryList.map((item) => (
          <div
            className={`flex flex-col items-center p-5 border cursor-pointer rounded-xl hover:border-primary hover:bg-blue-50 ${
              userCourseInput?.category === item.name && "border-primary bg-blue-50"
            }`}
            key={item.id}
            onClick={() => handleCategoryChange(item.name)}
          >
            {typeof item.icon === "string" ? (
              <Image src={item.icon} width={50} height={50} alt={item.name} />
            ) : (
              <div className="text-3xl">{item.icon}</div>
            )}
            <h2 className="mt-2 text-lg font-medium">{item.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectCategory;
