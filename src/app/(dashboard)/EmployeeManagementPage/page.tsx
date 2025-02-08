
"use client";

import Link from "next/link";
import { auth } from "../../../../firebase/firebaseConfig"; 
import { useState, useEffect } from "react";
import { archiveEmployeeByPersonalID, getActiveEmployees, updateEmployeeByPersonalID } from "../../services/employeeService";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";

import {
  Edit,
  Visibility,
  Delete as DeleteIcon,
  Archive,
  Add,
  Search as SearchIcon,
} from "@mui/icons-material";
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Select,
  MenuItem,
  TextField,
  Typography,
  InputAdornment,
Paper,
Table,
TableBody,
TableCell,
TableContainer,
TableHead,
TableRow,

CircularProgress,
Tooltip,
IconButton
} from "@mui/material";
import Image from "next/image";



const EmployeeManagementPage = () => {
const router = useRouter();
const [employees, setEmployees] = useState<any[]>([]);
const [loading, setLoading] = useState(true);
const [searchBy, setSearchBy] = useState("All");
const [searchQuery, setSearchQuery] = useState("");
const [rowsPerPage, setRowsPerPage] = useState(5);
const [currentPage, setCurrentPage] = useState(0);
const [openEditModal, setOpenEditModal] = useState(false);
const [editForm, setEditForm] = useState<any | null>(null);

const handleViewEmployee = (id: string) => {
  router.push(`/EmployeeManagementPage/EmployeeProfile/${id}`); // ✅ Fix Navigation Path
};

const fetchEmployees = async (uid: string) => {
  try {
    const fetchedEmployees = await getActiveEmployees(uid);
    setEmployees(fetchedEmployees);
  } catch (error) {
    console.error("Error fetching employees:", error);
  } finally {
    setLoading(false);
  }
};



  
// Fetch employees for the logged-in service center

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    if (user) {
      await fetchEmployees(user.uid);
    } else {
      console.error("❌ User not authenticated");
    }
  });

  return () => unsubscribe();
}, []);


// ** Filter employees based on search query **
const filteredEmployees = employees.filter((employee) => {
  const query = searchQuery.toLowerCase();
  if (searchBy === "All") {
    return (
      employee.first_name.toLowerCase().includes(query) ||
      employee.last_name.toLowerCase().includes(query) ||
      employee.mobile.includes(searchQuery) ||
      employee.email.toLowerCase().includes(query) ||
      employee.status.toLowerCase().includes(query)
    );
  }
  switch (searchBy.toLowerCase()) {
    case "firstname":
      return employee.first_name.toLowerCase().includes(query);
    case "lastname":
      return employee.last_name.toLowerCase().includes(query);
    case "mobile":
      return employee.mobile.includes(searchQuery);
    case "email":
      return employee.email.toLowerCase().includes(query);
    case "status":
      return employee.status.toLowerCase().includes(query);
    default:
      return false;
  }
});

const paginatedEmployees = filteredEmployees.slice(
  currentPage * rowsPerPage,
  currentPage * rowsPerPage + rowsPerPage
);
const handleUpdateEmployee = async () => {
  if (!editForm?.personal_id) {
    alert("❌ Employee Personal ID is missing");
    return;
  }

  try {
    await updateEmployeeByPersonalID(editForm.personal_id, editForm);
    alert("✅ Employee updated successfully!");
    setOpenEditModal(false);
    fetchEmployees(auth.currentUser?.uid || ""); // Refresh the employee list
  } catch (error) {
    alert(`❌ Failed to update employee`);
  }
};

const handleArchiveEmployee = async (personalID: string) => {
  if (!personalID) {
      alert("❌ Personal ID is missing");
      return;
  }

  try {
      await archiveEmployeeByPersonalID(personalID);
      alert("✅ Employee archived successfully!");

      // ✅ Refresh the employee list to remove from UI
      fetchEmployees(auth.currentUser?.uid || "");
  } catch (error) {
      alert("❌ Failed to archive employee");
  }
};


  return (
    <Box sx={{ p: 3, backgroundColor: "#f4f6f8", minHeight: "100vh" }}>

{openEditModal && editForm && (
  <Box
    sx={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backdropFilter: "blur(10px)",
      backgroundColor: "rgba(0, 0, 0, 0.4)",
      zIndex: 1000,
    }}
  >
    <Box
      sx={{
        backgroundColor: "#fff",
        borderRadius: "12px",
        boxShadow: "0px 15px 40px rgba(0, 0, 0, 0.3)",
        maxWidth: "700px",
        width: "95%",
        maxHeight: "90vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Modal Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#fff",
          padding: "16px 24px",
          borderBottom: "1px solid #ddd",
          minHeight: "80px",
        }}
      >
        <Typography variant="h5" fontWeight="bold" color="#1a237e">
          Edit Employee
        </Typography>
        <IconButton
          onClick={() => setOpenEditModal(false)}
          aria-label="close"
          sx={{ color: "#555", "&:hover": { color: "#222" } }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Modal Form Content */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          padding: "24px",
          "&::-webkit-scrollbar": { width: "8px" },
          "&::-webkit-scrollbar-thumb": { background: "#bbb", borderRadius: "5px" },
          "&::-webkit-scrollbar-thumb:hover": { background: "#888" },
        }}
      >
        {/* Form Fields */}
        {[
          { label: "First Name", key: "first_name" },
          { label: "Last Name", key: "last_name" },
          { label: "Personal ID", key: "personal_id", readOnly: true },
          { label: "Date of Birth", key: "date_of_birth", type: "date" },
          { label: "Gender", key: "gender", type: "select", options: ["Male", "Female", "Other"] },
          { label: "Role", key: "role", type: "select", options: ["Admin", "Manager", "Supervisor", "Employee", "Contractor"] },
          { label: "Job Role", key: "job_role" },
          { label: "Mobile", key: "mobile" },
          { label: "Email", key: "email" },
          { label: "Address 1", key: "address1" },
          { label: "Address 2", key: "address2" },
          { label: "City", key: "city" },
          { label: "County", key: "county" },
          { label: "Postcode", key: "postcode" },
        ].map(({ label, key, type, options }) => (
          type === "select" ? (
            <TextField
              key={key}
              label={label}
              select
              fullWidth
              value={editForm?.[key] || ""}
              onChange={(e) => setEditForm({ ...editForm, [key]: e.target.value })}
              margin="normal"
              variant="outlined"
              size="medium"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
              }}
            >
              {options?.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          ) : (
            <TextField
              key={key}
              label={label}
              type={type || "text"}
              fullWidth
              value={editForm?.[key] || ""}
              onChange={(e) => setEditForm({ ...editForm, [key]: e.target.value })}
              margin="normal"
              variant="outlined"
              size="medium"
              InputLabelProps={type === "date" ? { shrink: true } : {}}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
              }}
            />
          )
        ))}
      </Box>

      {/* Save Button */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
        <Button
          variant="contained"
          onClick={handleUpdateEmployee}
          sx={{
            px: 4,
            py: 1,
            backgroundColor: "#1a73e8",
            ":hover": { backgroundColor: "#135abf" },
          }}
        >
          Save Changes
        </Button>
      </Box>
    </Box>
  </Box>
)}

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
            ":hover": { background: "linear-gradient(to right, #0056b3, #0099cc)" },
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
            placeholder="Search..." 
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
              <TableCell sx={{ fontWeight: "bold", color: "white"}}>First Name</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "white"}}>Last Name</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "white"}}>Mobile</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "white"}}>Email</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "white" }}>Status</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "white"}}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} sx={{ textAlign: "center", py: 4 }}>
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : paginatedEmployees.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} sx={{ textAlign: "center", py: 4 }}>
                  No employees found
                </TableCell>
              </TableRow>
            ) : (
              paginatedEmployees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell >{employee.first_name}</TableCell>
                  <TableCell >{employee.last_name}</TableCell>
                  <TableCell >{employee.mobile}</TableCell>
                  <TableCell >{employee.email}</TableCell>
                  <TableCell >
        <Typography
          sx={{
            display: "inline-block",
            padding: "6px 14px",
            fontSize: "12px",
            fontWeight: "bold",
            borderRadius: "16px",
            textAlign: "center",
            backgroundColor:
              employee.status === "Active"
                ? "rgba(102, 187, 106, 0.15)"
                : "rgba(255, 171, 64, 0.2)",
            color: employee.status === "Active" ? "#4CAF50" : "#FF9800",
          }}
        >
          {employee.status}
        </Typography>
      </TableCell>
      <TableCell >
        <Box sx={{ display: "flex", gap: 1 }}>
        <Tooltip title="Edit">
  <IconButton 
    color="primary" 
    onClick={() => {
      setEditForm(employee); // ✅ Pre-fill form with employee data
      setOpenEditModal(true); // ✅ Open the modal
    }}
  >
    <Edit />
  </IconButton>
</Tooltip>



<Tooltip title="Archive">
    <IconButton
        color="warning"
        onClick={() => handleArchiveEmployee(employee.personal_id)}
    >
        <Archive />
    </IconButton>
</Tooltip>

<IconButton
  color="default"
  onClick={() => {
    if (!employee.personal_id) {
      console.error("❌ Personal ID is missing");
      return;
    }
    router.push(`/EmployeeProfile/${employee.personal_id}`);
  }}
>
  <Visibility />
</IconButton>



        </Box>
      </TableCell>


                </TableRow>
              ))
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