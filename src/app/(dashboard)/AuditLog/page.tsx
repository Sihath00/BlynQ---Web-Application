'use client';
import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Button,
  TextField,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';

import {
  Delete as DeleteIcon,
} from "@mui/icons-material";

import FileDownloadIcon from '@mui/icons-material/FileDownload';
import FilterListIcon from '@mui/icons-material/FilterList';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

interface AuditLog {
  id: string;
  employeeName: string;
  startTime: string;
  endTime: string;
  clientName: string;
  serviceType: string;
  timestamp: string;
}

// Sample Data
const sampleData: AuditLog[] = [
  { id: '1', employeeName: 'John Doe', startTime: '09:00', endTime: '10:30', clientName: 'Mike Johnson', serviceType: 'Oil Change', timestamp: '2024-01-20 10:30:00' },
  { id: '2', employeeName: 'Sarah Smith', startTime: '11:00', endTime: '12:15', clientName: 'Emma Wilson', serviceType: 'Tire Replacement', timestamp: '2024-01-20 12:15:00' },
  { id: '3', employeeName: 'David Lee', startTime: '14:00', endTime: '15:45', clientName: 'Michael Brown', serviceType: 'Brake Inspection', timestamp: '2024-01-20 15:45:00' },
  { id: '4', employeeName: 'John Doe', startTime: '09:00', endTime: '10:30', clientName: 'Mike Johnson', serviceType: 'Oil Change', timestamp: '2024-01-20 10:30:00' },
  { id: '5', employeeName: 'Sarah Smith', startTime: '11:00', endTime: '12:15', clientName: 'Emma Wilson', serviceType: 'Tire Replacement', timestamp: '2024-01-20 12:15:00' },
  { id: '6', employeeName: 'David Lee', startTime: '14:00', endTime: '15:45', clientName: 'Michael Brown', serviceType: 'Brake Inspection', timestamp: '2024-01-20 15:45:00' },
];

export default function AuditLogPage() {
  const [logs, setLogs] = useState<AuditLog[]>(sampleData);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filterEmployee, setFilterEmployee] = useState('');
  const [filterService, setFilterService] = useState('');
  const [filterDate, setFilterDate] = useState('');

  useEffect(() => {
    // Replace with API call later
  }, []);

  useEffect(() => {
    setPage(0);
  }, [filterEmployee, filterService, filterDate]);

  // Handle Page Change
  const handleChangePage = (_event: unknown, newPage: number) => setPage(newPage);

  // Handle Rows per Page Change
  const handleChangeRowsPerPage = (event: SelectChangeEvent<number>) => {
    setRowsPerPage(parseInt(event.target.value as string, 10));
    setPage(0);
  };

  // Apply Filters
  const filteredLogs = logs.filter((log) =>
    (!filterEmployee || log.employeeName.toLowerCase().includes(filterEmployee.toLowerCase())) &&
    (!filterService || log.serviceType.toLowerCase().includes(filterService.toLowerCase())) &&
    (!filterDate || log.timestamp.includes(filterDate))
  );

  // Export to Excel
  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredLogs);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'AuditLogs');
    XLSX.writeFile(workbook, 'mechanic_audit_logs.xlsx');
  };

  // Export to PDF
  const downloadPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["Employee", "Start Time", "End Time", "Client", "Service Type", "Timestamp"];
    const tableRows = filteredLogs.map((log) => [
      log.employeeName,
      log.startTime,
      log.endTime,
      log.clientName,
      log.serviceType,
      log.timestamp,
    ]);

    (doc as any).autoTable({
      head: [tableColumn],
      body: tableRows,
    });

    doc.save('mechanic_audit_logs.pdf');
  };

  function setCurrentPage(_arg0: (prev: any) => number): void {
    throw new Error('Function not implemented.');
  }

  function setSearchQuery(query: string) {
    setFilterEmployee(query);
    setFilterService(query);
    setFilterDate(query);
  }

  function setSearchBy(_arg0: string) {
    setFilterEmployee('');
    setFilterService('');
    setFilterDate('');
  }
  return (
    <Box sx={{ p: 4, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Header Section */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1a237e' }}>
          Mechanic Service Audit Log
        </Typography>
        <Box>
          <Button startIcon={<FileDownloadIcon />} onClick={downloadExcel} variant="contained" sx={{ mr: 1, background: 'linear-gradient(to right, #007bff, #00c6ff)', color: 'white' }}>
            Export Excel
          </Button>
          <Button startIcon={<FileDownloadIcon />} onClick={downloadPDF} variant="contained" sx={{ background: 'linear-gradient(to right, #ff4081, #ff80ab)', color: 'white' }}>
            Export PDF
          </Button>
        </Box>
      </Box>

      {/* Filter Section */}
      <Paper sx={{ p: 3, mb: 3, borderRadius: 3, backgroundColor: "#ffffff", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            mb: 3,
            color: "#1a237e",
            display: "flex",
            alignItems: "center",
          }}
        >
          <FilterListIcon sx={{ mr: 1, fontSize: 24, color: "#007bff" }} /> Filter Logs
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr 1fr" },
            gap: 2,
          }}
        >
          {/* Employee Filter */}
          <TextField
            label="Filter by Employee"
            variant="outlined"
            size="small"
            fullWidth
            value={filterEmployee}
            onChange={(e) => setFilterEmployee(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
                background: "#f9f9f9",
              },
            }}
          />

          {/* Service Type Filter */}
          <TextField
            label="Filter by Service Type"
            variant="outlined"
            size="small"
            fullWidth
            value={filterService}
            onChange={(e) => setFilterService(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
                background: "#f9f9f9",
              },
            }}
          />

          {/* Date Filter */}
          <TextField
            label="Filter by Date"
            type="date"
            variant="outlined"
            size="small"
            fullWidth
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
                background: "#f9f9f9",
              },
            }}
          />

                    {/* Clear Button */}
                      <Button
                      variant="outlined"
                      fullWidth
                      startIcon={<DeleteIcon />}
                      onClick={() => {
                        setSearchBy("All");
                        setSearchQuery("");
                      }}
                      sx={{
                        borderColor: "#ff1744",
                        fontWeight: "bold",
                        borderRadius: "10px",
                        background: "linear-gradient(to right, #ff1744, #ff616f)",
                        color: "white",
                        "&:hover": {
                          borderColor: "#d50000",
                          background: "linear-gradient(to right, #d50000, #ff616f)",
                        },
                      }}
                        >
                      Clear
                        </Button>
                      </Box>
                    </Paper>

      {/* Audit Log Table */}
      <Paper sx={{ borderRadius: 3, overflow: 'hidden' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#1a237e' }}>
              <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Employee</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Start Time</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>End Time</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Client</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Service Type</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Timestamp</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredLogs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} sx={{ textAlign: 'center', py: 4 }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3 }}>
                    <img
                      src="/noimage.png"
                      alt="No data found"
                      width={200}
                      height={200}
                      style={{ marginBottom: '1rem' }}
                    />
                     <Typography variant="h6" color="text.secondary">
                      No logs found
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              filteredLogs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((log) => (
                <TableRow key={log.id} sx={{ '&:hover': { backgroundColor: '#f0f0f0' } }}>
                  <TableCell>{log.employeeName}</TableCell>
                  <TableCell>{log.startTime}</TableCell>
                  <TableCell>{log.endTime}</TableCell>
                  <TableCell>{log.clientName}</TableCell>
                  <TableCell>{log.serviceType}</TableCell>
                  <TableCell>{log.timestamp}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Paper>

      {/* Pagination */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="body2">Rows per page:</Typography>
          <Select
        value={rowsPerPage}
        onChange={(e) => setRowsPerPage(Number(e.target.value))}
        sx={{
          ml: 1,
          border: "none",
          outline: "none",
          "& .MuiOutlinedInput-notchedOutline": { border: "none" },
        }}
          >
        <MenuItem value={5}>5</MenuItem>
        <MenuItem value={10}>10</MenuItem>
        <MenuItem value={25}>25</MenuItem>
          </Select>
        </Box>
        <Typography variant="body2">
          {page * rowsPerPage + 1}–
          {Math.min((page + 1) * rowsPerPage, filteredLogs.length)} of {filteredLogs.length}
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button onClick={() => setPage((prev) => Math.max(prev - 1, 0))} disabled={page === 0}>
        Previous
          </Button>
          <Button
        onClick={() =>
          setPage((prev) =>
            Math.min(prev + 1, Math.ceil(filteredLogs.length / rowsPerPage) - 1)
          )
        }
        disabled={(page + 1) * rowsPerPage >= filteredLogs.length}
          >
        Next
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
