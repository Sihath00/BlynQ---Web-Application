"use client";

import React, { useState } from "react";
import {
  DataGrid,
  GridColDef,
  GridPagination,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import {
  Box,
  Button,
  FormControl,
  Select,
  MenuItem,
  InputBase,
  Tabs,
  Tab,
  Typography,
  Tooltip,
  IconButton,
} from "@mui/material";
import { Edit, Delete, Visibility, Clear } from "@mui/icons-material";

const EmployeeManagementPage = () => {
  const [employees] = useState([
    { id: 1, firstName: "Sihath", lastName: "Senarath", email: "test1@gmail.com", mobile: "07795870697", status: "Approved" },
    { id: 2, firstName: "Amina", lastName: "Hajameyan", email: "amina@gmail.com", mobile: "074326599578", status: "Approved" },
    { id: 3, firstName: "Pesadi", lastName: "Wikramathilaka", email: "", mobile: "07432659957", status: "Approved" },
    { id: 4, firstName: "Willy", lastName: "Okey", email: "Wokey71@gmail.com", mobile: "07492090826", status: "Archived" },
    { id: 5, firstName: "Yilmaz", lastName: "Asik", email: "yilmazasik17@hotmail.co.uk", mobile: "07570145866", status: "Approved" },
    { id: 6, firstName: "Gaindu", lastName: "Amarasingha", email: "test1@gmail.com", mobile: "07795870697", status: "Approved" },
    { id: 7, firstName: "Santhul", lastName: "Senarath", email: "test1@gmail.com", mobile: "07795870697", status: "Approved" },
    { id:87, firstName: "Santhul", lastName: "Senarath", email: "test1@gmail.com", mobile: "07795870697", status: "Approved" },
  ]);
  const [activeTab, setActiveTab] = useState(0);
  const [searchFilter, setSearchFilter] = useState("All");
  const [searchValue, setSearchValue] = useState("");

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setActiveTab(newValue);
  };

  const columns: GridColDef[] = [
    { field: "firstName", headerName: "First Name", flex: 1 },
    { field: "lastName", headerName: "Last Name", flex: 1 },
    { field: "mobile", headerName: "Mobile", flex: 1 },
    { field: "email", headerName: "Email", flex: 1.5 },
    {
      field: "status",
      headerName: "Status",
      flex: 0.8,
      renderCell: (params) => (
        <Typography
          sx={{
            display: "inline-block",
            padding: "4px 12px",
            fontSize: "12px",
            fontWeight: "500",
            borderRadius: "12px",
            textAlign: "center",
            backgroundColor:
              params.value === "Approved" ? "rgba(102, 187, 106, 0.15)" : "rgba(158, 158, 158, 0.1)",
            color: params.value === "Approved" ? "#4CAF50" : "#9E9E9E",
            minWidth: "80px",
          }}
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: () => (
        <Box sx={{ display: "flex", gap: 1 }}>
          <Tooltip title="Edit">
            <IconButton color="primary">
              <Edit />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton color="error">
              <Delete />
            </IconButton>
          </Tooltip>
          <Tooltip title="View">
            <IconButton color="success">
              <Visibility />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ p: 3, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          Employee List
        </Typography>
        <Button
          variant="contained"
          sx={{
            background: "linear-gradient(to right, #4caf50, #81c784)",
            color: "white",
            px: 3,
            textTransform: "capitalize",
            borderRadius: 2,
            boxShadow: 2,
            ":hover": {
              background: "linear-gradient(to right, #66bb6a, #a5d6a7)",
            },
          }}
        >
          Add Employee
        </Button>
      </Box>

      {/* Tabs and Filters */}
      <Box
        sx={{
          backgroundColor: "white",
          boxShadow: 1,
          borderRadius: 2,
          p: 2,
          mb: 3,
        }}
      >
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          textColor="primary"
          indicatorColor="primary"
          sx={{
            "& .MuiTab-root": {
              textTransform: "capitalize",
              fontWeight: "bold",
              minWidth: "100px",
            },
          }}
        >
          <Tab label="All" />
          <Tab label="Active" />
          <Tab label="Archives" />
        </Tabs>
        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <Select
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              displayEmpty
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="First Name">First Name</MenuItem>
              <MenuItem value="Last Name">Last Name</MenuItem>
              <MenuItem value="Mobile">Mobile</MenuItem>
              <MenuItem value="Email">Email</MenuItem>
              <MenuItem value="Status">Status</MenuItem>
            </Select>
          </FormControl>
          <InputBase
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            sx={{
              flex: 1,
              px: 2,
              py: 1,
              border: "1px solid #ddd",
              borderRadius: "8px",
              backgroundColor: "#f9f9f9",
              fontSize: "0.9rem",
            }}
          />
          <Button
            variant="text"
            color="error"
            startIcon={<Clear />}
            onClick={() => setSearchValue("")}
            sx={{ fontSize: "0.8rem" }}
          >
            Clear
          </Button>
        </Box>
      </Box>

      {/* Data Grid */}
      <Box
        sx={{
          height: 500,
          backgroundColor: "white",
          boxShadow: 2,
          borderRadius: 2,
        }}
      >
    

    <DataGrid
  rows={employees}
  columns={columns}
  pagination
  pageSizeOptions={[7, 10, 25]} // Allow multiple options for rows per page
  initialState={{
    pagination: {
      paginationModel: {
        pageSize: 7, // Default page size
        page: 0, // Default starting page
      },
    },
  }}
  sx={{
    "& .MuiDataGrid-row:hover": { backgroundColor: "#f5f5f5" },
    "& .MuiDataGrid-columnHeaders": {
      backgroundColor: "#e3f2fd",
      fontWeight: "bold",
    },
    "& .MuiDataGrid-row:nth-of-type(odd)": { backgroundColor: "#fafafa" },
  }}
/>
      </Box>
    </Box>
  );
};

export default EmployeeManagementPage;