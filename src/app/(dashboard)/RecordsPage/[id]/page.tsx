import React from "react";

// Simulated API function to fetch report details
async function getReportById(id: number) {
  const reports = [
    {
      id: 1,
      vehicleNo: "D001",
      serviceDate: "2025-01-20",
      serviceType: "Oil Change",
      employeeName: "John Smith",
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

  return reports.find((report) => report.id === id);
}

const ReportDetailPage = async ({ params }: { params: { id: string } }) => {
  const report = await getReportById(Number(params.id));

  if (!report) {
    return <div className="p-6">Report not found.</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Service Report Details</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <p><strong>Record ID:</strong> {report.id}</p>
        <p><strong>Vehicle No:</strong> {report.vehicleNo}</p>
        <p><strong>Service Date:</strong> {report.serviceDate}</p>
        <p><strong>Service Type:</strong> {report.serviceType}</p>
        <p><strong>Service Done By:</strong> {report.employeeName}</p>
      </div>
    </div>
  );
};

export default ReportDetailPage;