"use client";

import Link from "next/link";
import React, { useState } from "react";
import {
  Box,
  Button,
  Select,
  MenuItem,
  TextField,
  Typography,
  Tooltip,
  IconButton,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  Edit,
  Visibility,
  Search as SearchIcon,
  PersonAdd,
  Delete as DeleteIcon,
  Archive,
} from "@mui/icons-material";

const EmployeeManagementPage = () => {
  const [employees] = useState([
    { id: 1, firstName: "Sihath Senarath", lastName: "Yapa", mobile: "0777492400", email: "testemployeee@gmail.com", status: "Approved" },
    { id: 2, firstName: "Test Employee", lastName: "Two", mobile: "0777492499", email: "testemployeetwo@gmail.com", status: "Approved" },
    { id: 3, firstName: "Test Employee", lastName: "One ", mobile: "0777492455", email: "testemployeeone@gmail.com", status: "Approved" },
    { id: 4, firstName: "Amina", lastName: "Hajameyan", mobile: "07491898664", email: "amina@gmail.com", status: "Approved" },
    { id: 5, firstName: "Pesadi", lastName: "Wikramathilaka", mobile: "7538831270", email: "pesadi@googlemail.com", status: "Approved" },
    { id: 4, firstName: "Gaindu", lastName: "Amarasingha", mobile: "07491898664", email: "gaindu@gmail.com", status: "Approved" },
    { id: 5, firstName: "Sithum", lastName: "Duleka", mobile: "7538831270", email: "sithum@googlemail.com", status: "Approved" },
  ]);
  

  const [searchBy, setSearchBy] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);

  // ** Pagination Logic **
  const paginatedEmployees = employees.slice(
    currentPage * rowsPerPage,
    currentPage * rowsPerPage + rowsPerPage
  );

  return (
    <Box sx={{ p: 3, backgroundColor: "#f4f6f8", minHeight: "100vh" }}>
      {/* Page Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h5" fontWeight="bold">
          Employee List
        </Typography>

        {/* Register Employee Button */}
        <Button 
          component={Link} 
          href="/EmployeeManagementPage/RegEmployee" 
          variant="contained" 
          startIcon={<PersonAdd />} 
          sx={{ px: 3, borderRadius: 2 }}
        >
          Add Employee
        </Button>
      </Box>

      {/* Search & Filters */}
      <Paper sx={{ p: 3, borderRadius: 3, mb: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {/* Search By Dropdown */}
          <TextField
            select
            label="Search By"
            value={searchBy}
            onChange={(e) => setSearchBy(e.target.value)}
            fullWidth
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="First Name">First Name</MenuItem>
            <MenuItem value="Last Name">Last Name</MenuItem>
            <MenuItem value="Mobile">Mobile</MenuItem>
            <MenuItem value="Email">Email</MenuItem>
            <MenuItem value="Status">Status</MenuItem>
          </TextField>

          {/* Search Input */}
          <TextField
            placeholder="Search..."
            variant="outlined"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />

          {/* Clear Button */}
          <Button variant="text" color="error" startIcon={<DeleteIcon />} onClick={() => setSearchQuery("")}>
            Clear
          </Button>
        </Box>
      </Paper>

      {/* Employee Table */}
      <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#f4f6f8" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>First Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Last Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Mobile</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedEmployees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>{employee.firstName}</TableCell>
                <TableCell>{employee.lastName}</TableCell>
                <TableCell>{employee.mobile}</TableCell>
                <TableCell sx={{ color: employee.email === "Not Provided" ? "#9E9E9E" : "inherit" }}>
                  {employee.email}
                </TableCell>
                <TableCell>
                  <Typography
                    sx={{
                      display: "inline-block",
                      padding: "6px 14px",
                      fontSize: "12px",
                      fontWeight: "bold",
                      borderRadius: "16px",
                      textAlign: "center",
                      backgroundColor: employee.status === "Approved" ? "rgba(102, 187, 106, 0.15)" : "rgba(255, 171, 64, 0.2)",
                      color: employee.status === "Approved" ? "#4CAF50" : "#FF9800",
                    }}
                  >
                    {employee.status}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                    <Tooltip title="Edit">
                      <IconButton color="primary">
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Archive">
                      <IconButton color="warning">
                        <Archive />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="View">
                      <IconButton color="default">
                        <Visibility />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="body2">Rows per page:</Typography>
          <Select
            value={rowsPerPage}
            onChange={(e) => setRowsPerPage(Number(e.target.value))}
            sx={{
              ml: 1,
              backgroundColor: "#f9f9f9",
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
          {Math.min((currentPage + 1) * rowsPerPage, employees.length)} of {employees.length}
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))} disabled={currentPage === 0}>
            Previous
          </Button>
          <Button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(employees.length / rowsPerPage) - 1))}>
            Next
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default EmployeeManagementPage;