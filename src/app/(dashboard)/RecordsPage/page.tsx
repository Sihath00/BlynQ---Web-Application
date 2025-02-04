"use client";
import React, { useState, useEffect } from "react";
import { Typography, Paper, Box, TextField, MenuItem, Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Chip, Tooltip, Switch, IconButton, Select, InputAdornment } from '@mui/material';
import { FilterList as FilterListIcon, Search as SearchIcon, Delete as DeleteIcon } from '@mui/icons-material';

interface Record {
  id: number;
  vehicleNumber: string;
  serviceId: string;
  serviceType: string;
  clientName: string;
  serviceDate: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  previousStatus?: 'Pending' | 'Approved' | 'Rejected';
}

const RecordsPage: React.FC = () => {
  const [records, setRecords] = useState<Record[]>([
    { id: 1, vehicleNumber: 'V1', serviceId: 'S001', serviceType: 'Type A', clientName: 'Client 1', serviceDate: '2024-01-01', status: 'Pending' },
    { id: 2, vehicleNumber: 'V002', serviceId: 'S002', serviceType: 'Type B', clientName: 'Client 2', serviceDate: '2022-01-02', status: 'Pending' },
    { id: 3, vehicleNumber: 'V003', serviceId: 'S003', serviceType: 'Type C', clientName: 'Client 3', serviceDate: '2023-01-01', status: 'Pending' },
    { id: 4, vehicleNumber: 'V004', serviceId: 'S004', serviceType: 'Type D', clientName: 'Client 3', serviceDate: '2024-07-02', status: 'Pending' },
    { id: 5, vehicleNumber: 'V005', serviceId: 'S005', serviceType: 'Type E', clientName: 'Client 3', serviceDate: '2024-01-01', status: 'Pending' },
    { id: 6, vehicleNumber: 'V006', serviceId: 'S006', serviceType: 'Type F', clientName: 'Client 6', serviceDate: '2022-05-02', status: 'Pending' },
    { id: 7, vehicleNumber: 'V007', serviceId: 'S007', serviceType: 'Type G', clientName: 'Client 7', serviceDate: '2023-03-01', status: 'Pending' },
    { id: 8, vehicleNumber: 'V006', serviceId: 'S008', serviceType: 'Type H', clientName: 'Client 8', serviceDate: '2024-01-02', status: 'Pending' },
    { id: 9, vehicleNumber: 'V009', serviceId: 'S009', serviceType: 'Type I', clientName: 'Client 9', serviceDate: '2022-01-01', status: 'Pending' },
    { id: 10, vehicleNumber: 'V010', serviceId: 'S010', serviceType: 'Type J', clientName: 'Client 10', serviceDate: '2023-01-01', status: 'Pending' },
    { id: 11, vehicleNumber: 'V011', serviceId: 'S011', serviceType: 'Type K', clientName: 'Client 11', serviceDate: '2024-01-01', status: 'Pending' },
    { id: 12, vehicleNumber: 'V012', serviceId: 'S012', serviceType: 'Type L', clientName: 'Client 12', serviceDate: '2022-01-01', status: 'Pending' },
    { id: 13, vehicleNumber: 'V013', serviceId: 'S013', serviceType: 'Type M', clientName: 'Client 13', serviceDate: '2023-01-01', status: 'Pending' },
    { id: 14, vehicleNumber: 'V014', serviceId: 'S014', serviceType: 'Type N', clientName: 'Client 14', serviceDate: '2024-01-01', status: 'Pending' },
    { id: 15, vehicleNumber: 'V015', serviceId: 'S015', serviceType: 'Type O', clientName: 'Client 15', serviceDate: '2022-01-01', status: 'Pending' },
    { id: 16, vehicleNumber: 'V016', serviceId: 'S016', serviceType: 'Type P', clientName: 'Client 16', serviceDate: '2023-01-01', status: 'Pending' },
    { id: 17, vehicleNumber: 'V017', serviceId: 'S017', serviceType: 'Type Q', clientName: 'Client 17', serviceDate: '2024-01-01', status: 'Pending' },
    { id: 18, vehicleNumber: 'V018', serviceId: 'S018', serviceType: 'Type R', clientName: 'Client 18', serviceDate: '2022-01-01', status: 'Pending' },
  ]);
  const [searchBy, setSearchBy] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [serviceDateFilter, setServiceDateFilter] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState<number>(0);

  useEffect(() => {
    setCurrentPage(0);
  }, [searchQuery, searchBy, statusFilter, serviceDateFilter]);

  const handleApprove = (id: number) => {
    setRecords(records.map(record => 
      record.id === id ? { ...record, previousStatus: record.status, status: 'Approved' } : record
    ));
  };

  const handleReject = (id: number) => {
    setRecords(records.map(record => 
      record.id === id ? { ...record, previousStatus: record.status, status: 'Rejected' } : record
    ));
  };

  const handleRevert = (id: number) => {
    setRecords(records.map(record => 
      record.id === id && record.previousStatus ? { ...record, status: record.previousStatus, previousStatus: undefined } : record
    ));
  };


  const filteredRecords = records.filter((record) => {
    // ✅ Status Filtering
    if (statusFilter !== "All" && record.status !== statusFilter) return false;
  
    // ✅ Service Date Filtering
    if (serviceDateFilter && record.serviceDate !== serviceDateFilter) return false;
  
    // ✅ Search Filtering
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      
  
      //  If searching by "All", check all relevant fields
      if (
        searchBy === "All" &&
        !(
          record.vehicleNumber.toLowerCase().includes(lowerQuery) ||
          record.serviceId.toLowerCase().includes(lowerQuery) ||
          record.clientName.toLowerCase().includes(lowerQuery)
        )
      ) {
        return false;
      }
  
      if (searchBy === "Vehicle Number" && !record.vehicleNumber.toLowerCase().includes(lowerQuery)) {
        return false;
      }
  
      if (searchBy === "Service ID" && !record.serviceId.toLowerCase().includes(lowerQuery)) {
        return false;
      }
  
      if (searchBy === "Client Name" && !record.clientName.toLowerCase().includes(lowerQuery)) {
        return false;
      }
    }
  
    return true;
  });
  
  const paginatedRecords = filteredRecords.slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage);

  return (
    <div className="p-4">
      <Typography variant="h5" fontWeight="bold" sx={{ fontSize: "1.5rem", mb: 2, color: "#1a237e" }}>
        Records Page
      </Typography>

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
          <FilterListIcon sx={{ mr: 1, fontSize: 24, color: "#007bff" }} /> Filter Records
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: 2,
          }}
        >
          <TextField
            select
            label="Search By"
            value={searchBy}
            onChange={(e) => setSearchBy(e.target.value)}
            variant="outlined"
            size="small"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
                background: "#f9f9f9",
                height: "40px",
              },
            }}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Vehicle Number">Vehicle Number</MenuItem>
            <MenuItem value="Service ID">Service ID</MenuItem>
            <MenuItem value="Client Name">Client Name</MenuItem>
          </TextField>

          <TextField
            select
            label="Status Filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            variant="outlined"
            size="small"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
                background: "#f9f9f9",
                height: "40px",
              },
            }}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Approved">Approved</MenuItem>
            <MenuItem value="Rejected">Rejected</MenuItem>
          </TextField>

          <TextField
            label="Service Date"
            type="date"
            value={serviceDateFilter}
            onChange={(e) => setServiceDateFilter(e.target.value)}
            variant="outlined"
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
                background: "#f9f9f9",
                height: "40px",
              },
            }}
          />

          <TextField
            placeholder="Search..."
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
                background: "#f9f9f9",
                height: "40px",
              },
            }}
          />

          <Button
            variant="outlined"
            startIcon={<DeleteIcon />}
            onClick={() => {
              setSearchBy("All");
              setSearchQuery("");
              setStatusFilter("All");
              setServiceDateFilter("");
            }}
            sx={{
              borderColor: "#ff1744",
              fontWeight: "bold",
              borderRadius: "10px",
              background: "linear-gradient(to right, #ff1744, #ff616f)",
              color: "white",
              height: "40px",
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

      <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#1a237e' }}>
              <TableCell sx={{ fontWeight: "bold", color: 'white' }}>Service ID</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: 'white' }}>Vehicle Number</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: 'white' }}>Client Name</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: 'white' }}>Service Type</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: 'white' }}>Service Date</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: 'white' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: 'white' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRecords.length === 0 ? (
                <TableRow>
                <TableCell colSpan={7} sx={{ textAlign: 'center', py: 4 }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3 }}>
                  <img
                    src="/noimage.png"
                    alt="No data found"
                    width={300}
                    height={300}
                    style={{ marginBottom: '1rem' }}
                  />
                  </Box>
                </TableCell>
                </TableRow>
            ) : (
              paginatedRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>{record.serviceId}</TableCell>
                  <TableCell>{record.vehicleNumber}</TableCell>
                  <TableCell>{record.clientName}</TableCell>
                  <TableCell>{record.serviceType}</TableCell>
                  <TableCell>{record.serviceDate}</TableCell>
                  <TableCell>
                    <Chip
                      label={record.status}
                      sx={{
                        backgroundColor: record.status === "Rejected" ? "#FFE5B4" : record.status === "Approved" ? "#E8F5E9" : "#FFF9C4",
                        color: record.status === "Rejected" ? "#D84315" : record.status === "Approved" ? "#2E7D32" : "#F57F17",
                        fontWeight: "bold",
                        borderRadius: "16px",
                        px: 2,
                        py: 0.5,
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    {record.status === 'Pending' && (
                      <>
                        <Button
                          variant="contained"
                          color="success"
                          onClick={() => handleApprove(record.id)}
                          sx={{ mr: 1, borderRadius: "10px" }}
                        >
                          Approve
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => handleReject(record.id)}
                          sx={{ borderRadius: "10px" }}
                        >
                          Reject
                        </Button>
                      </>
                    )}
                    {record.status !== 'Pending' && (
                      <Button
                        variant="contained"
                        color="warning"
                        onClick={() => handleRevert(record.id)}
                        sx={{ borderRadius: "10px" }}
                      >
                        Revert
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

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
          {currentPage * rowsPerPage + 1}–
          {Math.min((currentPage + 1) * rowsPerPage, filteredRecords.length)} of {filteredRecords.length}
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
            disabled={currentPage === 0}
          >
            Previous
          </Button>
          <Button
            onClick={() =>
              setCurrentPage((prev) =>
                Math.min(prev + 1, Math.ceil(filteredRecords.length / rowsPerPage) - 1)
              )
            }
            disabled={(currentPage + 1) * rowsPerPage >= filteredRecords.length}
          >
            Next
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default RecordsPage;
