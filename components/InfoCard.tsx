import Image from "next/image";
import React from "react";

const InfoCard = ({ type }: { type: String }) => {
  return (
    <div className="rounded-2xl odd:bg-blue-400 even:bg-blue-200 bg-black p-4 flex-1 min-w-[130px]">
      <div className="flex justify-between items-center">
        <span className="text-[10px] bg-white px-2 py-1 rounded-full text-green-600">2024/12</span>
        <Image src="/BottomBar/more.png" alt="" width={20} height={20} />
      </div>
      <h1 className="text-2xl font-semibold my-4 ">25</h1>
      <h1 className="capitalize text-sm font-medium text-gray-700">{type}</h1>
    </div>
  );
};

export default InfoCard;
