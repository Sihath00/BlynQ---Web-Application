"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Define the type for a single report
type Report = {
  id: number;
  vehicleNo: string;
  serviceDate: string;
  serviceType: string;
  employeeName: string; // Added service done by (employee name)
};

// Simulated API call to fetch reports
async function getReports(): Promise<Report[]> {
  return [
    {
      id: 1,
      vehicleNo: "CAB-6565",
      serviceDate: "2025-01-20",
      serviceType: "Oil Change",
      employeeName: "John Smith", // Employee name added
    },
    {
      id: 2,
      vehicleNo: "D002",
      serviceDate: "2025-01-18",
      serviceType: "Tire Rotation",
      employeeName: "Jane Doe",
    },
    {
      id: 3,
      vehicleNo: "D003",
      serviceDate: "2025-01-25",
      serviceType: "Brake Inspection",
      employeeName: "Mark Johnson",
    },
  ];
}

const ServiceReportPage = () => {
  const [reports, setReports] = useState<Report[]>([]); // State typed as an array of Report
  const [filter, setFilter] = useState<string>(""); // State typed as a string
  const router = useRouter();

  useEffect(() => {
    const fetchReports = async () => {
      const data = await getReports();
      setReports(data);
    };

    fetchReports();
  }, []);

  // Filter reports by employee name or vehicle number
  const filteredReports = reports.filter(
    (report) =>
      report.employeeName.toLowerCase().includes(filter.toLowerCase()) ||
      report.vehicleNo.toLowerCase().includes(filter.toLowerCase())
  );

  // Handle row click and navigate to the detail page
  const handleRowClick = (id: number) => {
    router.push(`/RecordsPage/${id}`);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Service Report</h1>
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search by Vehicle No or Employee Name..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg"
        />
      </div>
      <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2">Record ID</th>
            <th className="px-4 py-2">Vehicle No</th>
            <th className="px-4 py-2">Service Date</th>
            <th className="px-4 py-2">Service Type</th>
            <th className="px-4 py-2">Service Done By</th>
          </tr>
        </thead>
        <tbody>
          {filteredReports.map((report) => (
            <tr
              key={report.id}
              className="text-center border-b cursor-pointer hover:bg-gray-100"
              onClick={() => handleRowClick(report.id)}
            >
              <td className="px-4 py-2">{report.id}</td>
              <td className="px-4 py-2">{report.vehicleNo}</td>
              <td className="px-4 py-2">{report.serviceDate}</td>
              <td className="px-4 py-2">{report.serviceType}</td>
              <td className="px-4 py-2">{report.employeeName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ServiceReportPage;