import React from "react";
import Image from "next/image";
import CategoryList from "@/app/_shared/CategoryList";

const SelectCategory = () => {
  return (
    <div className="grid grid-cols-3 gap-10 px-10">
      {CategoryList.map((item) => (
        <div className="flex flex-col items-center p-5 border cursor-pointer rounded-xl hover:border-primary hover:bg-blue-50" key={item.id}>
          {typeof item.icon === "string" ? (
            <Image src={item.icon} width={50} height={50} alt={item.name} />
          ) : (
            <div className="text-3xl">{item.icon}</div>
          )}
          <h2 className="mt-2 text-lg font-medium">{item.name}</h2>
        </div>
      ))}
    </div>
  );
};

export default SelectCategory;
