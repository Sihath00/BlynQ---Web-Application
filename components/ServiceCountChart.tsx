"use client";
import Image from "next/image";
import React from "react";
import {
  Legend,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
} from "recharts";
const data = [
  {
    name: "Total",
    count:106,
    fill: "white",
  },
  {
    name: "Year",
    count: 65,

    fill: "#8884d8",
  },
  {
    name: "Month",
    count: 53,
    fill: "#83a6ed",
  },
  
];

const ServiceCountChart = () => {
  return (
    <div className="bg-white rounded-xl w-full h-full p-4">
      {/* Title*/}
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Services</h1>
        <Image src={"/Charts/moreDark.png"} alt="" width={20} height={20} />
      </div>
      {/* Chart */}
      <div className="relative w-full h-[70%] ">
        <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart cx="50%" cy="50%" innerRadius="40%" outerRadius="100%" barSize={32} data={data}>
          <RadialBar
            background
            dataKey="count"
          />
       
        </RadialBarChart>
      </ResponsiveContainer>
      <Image src={"/Charts/ServicerImage2.png"} alt="" width={60} height={50} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></Image>
      </div>
      {/* Bottom */}
      <div className="flex justify-center gap-16">
        <div className="flex flex-col gap-1">
          <div className="w-5 h-5 bg-sky-400 rounded-full"/>
          <h1 className="font-bold">1,234</h1>
          <h1 className="text-xs text-gray-500">Services (55%)</h1>
        </div>
        <div className="flex flex-col gap-1">
          <div className="w-5 h-5 bg-blue-700 rounded-full"/>
          <h1 className="font-bold">1,234</h1>
          <h1 className="text-xs text-gray-500">Year of Services (55%)</h1>
        </div>
      </div>
    </div>
  );
};

export default ServiceCountChart;
