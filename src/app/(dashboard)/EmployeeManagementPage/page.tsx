"use client";

import Link from "next/link";
import Image from "next/image";
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
  Delete as DeleteIcon,
  Archive,
  Add,
  Search as SearchIcon,
} from "@mui/icons-material";
import FilterListIcon from '@mui/icons-material/FilterList';

const EmployeeManagementPage = () => {
  const [employees] = useState([
    { id: 1, firstName: "Sihath Senarath", lastName: "Yapa", mobile: "0777492400", email: "testemployeee@gmail.com", status: "Approved" },
    { id: 2, firstName: "Test Employee", lastName: "Two", mobile: "0777492499", email: "testemployeetwo@gmail.com", status: "Approved" },
    { id: 3, firstName: "Test Employee", lastName: "One ", mobile: "0777492455", email: "testemployeeone@gmail.com", status: "Approved" },
    { id: 4, firstName: "Amina", lastName: "Hajameyan", mobile: "07491898664", email: "amina@gmail.com", status: "Approved" },
    { id: 5, firstName: "Pesadi", lastName: "Wikramathilaka", mobile: "7538831270", email: "pesadi@googlemail.com", status: "Approved" },
    { id: 6, firstName: "Gaindu", lastName: "Amarasingha", mobile: "07491898664", email: "gaindu@gmail.com", status: "Approved" },
    { id: 7, firstName: "Sithum", lastName: "Duleka", mobile: "7538831270", email: "sithum@googlemail.com", status: "Approved" },
  ]);
  

  const [searchBy, setSearchBy] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);

  // ** Pagination Logic **
  // Filter the entire dataset based on the search query before applying pagination
  const filteredEmployees = employees.filter((employee) => {
    if (searchBy === "All") {
      return (
        employee.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.mobile.includes(searchQuery) ||
        employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.status.toLowerCase().includes(searchQuery.toLowerCase())
      );
    } else {
      const field = searchBy.toLowerCase();
      switch (field) {
        case 'firstname':
          return employee.firstName.toLowerCase().includes(searchQuery.toLowerCase());
        case 'lastname':
          return employee.lastName.toLowerCase().includes(searchQuery.toLowerCase());
        case 'mobile':
          return employee.mobile.includes(searchQuery);
        case 'email':
          return employee.email.toLowerCase().includes(searchQuery.toLowerCase());
        case 'status':
          return employee.status.toLowerCase().includes(searchQuery.toLowerCase());
        default:
          return false;
      }
    }
  });

  const paginatedEmployees = filteredEmployees.slice(
    currentPage * rowsPerPage,
    currentPage * rowsPerPage + rowsPerPage
  );

  function handleOpen(): void {
    throw new Error("Function not implemented.");
  }

  return (
    <Box sx={{ p: 3, backgroundColor: "#f4f6f8", minHeight: "100vh" }}>
      {/* Page Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h5" fontWeight="bold" sx={{ fontSize: "1.5rem", color: "#1a237e" }}>
          Employee List
        </Typography>

        {/* Register Employee Button */}
        <Button
          component={Link} 
          href="/EmployeeManagementPage/RegEmployee" 
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpen()}
            sx={{
             background: "linear-gradient(to right, #007bff, #00c6ff)",
            color: "white",
            px: 4,
            py: 1.2,
            fontSize: "1rem",
            borderRadius: "30px",
            textTransform: "capitalize",
            fontWeight: "bold",
            boxShadow: "0px 5px 15px rgba(0, 123, 255, 0.3)",
            ":hover": {
            background: "linear-gradient(to right, #0056b3, #0099cc)",
               },
              }}
             >
           Add Employee
         </Button>
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
          <FilterListIcon sx={{ mr: 1, fontSize: 24, color: "#007bff" }} /> Filter Employees
        </Typography>

        <Box
          sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" },
        gap: 2,
          }}
        >
          {/* Search By */}
          <TextField
            label="Search By"
            variant="outlined"
            size="small"
            fullWidth
            select
            value={searchBy}
            onChange={(e) => setSearchBy(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
                background: "#f9f9f9",
              },
            }}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="FirstName">First Name</MenuItem>
            <MenuItem value="LastName">Last Name</MenuItem>
            <MenuItem value="Mobile">Mobile</MenuItem>
            <MenuItem value="Email">Email</MenuItem>
            <MenuItem value="Status">Status</MenuItem>
          </TextField>

          {/* Search Query */}
          <TextField
            placeholder="Search..." // Changed from label to placeholder
            variant="outlined"
            size="small"
            fullWidth
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(0); // Reset to the first page on new search
            }}
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
              setCurrentPage(0); // Reset to the first page on clear
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

      
      {/* Employee Table */}
      <TableContainer component={Paper} sx={{ borderRadius: 3, overflow: "hidden" }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#f4f6f8" }}>
            <TableRow sx={{ backgroundColor: '#1a237e' }}>
              <TableCell sx={{ fontWeight: "bold",color:"white" }}>First Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" ,color:"white"}}>Last Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" ,color:"white"}}>Mobile</TableCell>
              <TableCell sx={{ fontWeight: "bold" ,color:"white"}}>Email</TableCell>
              <TableCell sx={{ fontWeight: "bold" ,color:"white"}}>Status</TableCell>
              <TableCell sx={{ fontWeight: "bold" ,color:"white"}}>Actions</TableCell>
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
            {paginatedEmployees.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} sx={{ textAlign: 'center', py: 4 }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3 }}>
                    <Image
                      src="/noimage.png"
                      alt="No data found"
                      width={300}
                      height={300}
                      style={{ marginBottom: '1rem' }}
                    />
                  </Box>
                </TableCell>
              </TableRow>
            )}
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
            {Math.min((currentPage + 1) * rowsPerPage, filteredEmployees.length)} of {filteredEmployees.length}
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
                  Math.min(prev + 1, Math.ceil(filteredEmployees.length / rowsPerPage) - 1)
                )
              }
              disabled={(currentPage + 1) * rowsPerPage >= filteredEmployees.length}
            >
              Next
            </Button>
          </Box>
        </Box>
       </Box>
   );  
};

export default EmployeeManagementPage;
