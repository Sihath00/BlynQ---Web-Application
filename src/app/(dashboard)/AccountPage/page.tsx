"use client";
import { onAuthStateChanged } from "firebase/auth";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Image from "next/image"; 
import {
  Box,
  Typography,
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  TextField,
  Chip,
  Switch,
  InputAdornment,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import {
  Search as SearchIcon,
  LockReset as LockResetIcon,
  Close as CloseIcon,
  Visibility,
  VisibilityOff,
  FilterList as FilterListIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { auth } from "../../../../firebase/firebaseConfig";


const UserList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchBy, setSearchBy] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);
  const [openResetModal, setOpenResetModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState<Employee[]>([]); 
  interface Employee {
    id: string;
    name: string;
    email: string;
    role: string;
    status: 'Active' | 'Inactive';
  }

   // Fetch employees based on UID
   useEffect(() => {
    const fetchEmployees = async (uid: string) => {
      try {
          console.log("🔹 Fetching employees for UID:", uid);
  
          const response = await axios.get(`http://localhost:5001/api/employees/service-center/${uid}`);
          console.log("✅ Employee Data:", response.data);
  
          setEmployees(response.data);
          setLoading(false);
      } catch (error) {
          console.error("❌ Error fetching employees:", error);
          setLoading(false);
      }
  };

  // Open Reset Password Modal
  const handleOpenResetModal = (username: string) => {
    setSelectedUser(username);
    setOpenResetModal(true);
  };

  // Close Modal & Reset Inputs
  const handleCloseResetModal = () => {
    setOpenResetModal(false);
    setPassword("");
    setConfirmPassword("");
  };
  // Listen for Auth Changes
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("✅ User authenticated:", user.uid);
      fetchEmployees(user.uid);
    } else {
      console.error("❌ User not authenticated");
    }
  });

  return () => unsubscribe();
}, []);

   // Filtering employees based on search and status
   const filteredEmployees = employees.filter((user) => {
    if (statusFilter !== "All" && user.status.toLowerCase() !== statusFilter.toLowerCase()) return false;
    if (searchBy === "All")
      return (
        (user.name?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
        (user.email?.toLowerCase() || '').includes(searchQuery.toLowerCase())
      );
    if (searchBy === "First Name") return (user.name?.toLowerCase() || '').includes(searchQuery.toLowerCase());
    if (searchBy === "Email") return (user.email?.toLowerCase() || '').includes(searchQuery.toLowerCase());
    return false;
  });


  // Paginate employees
  const paginatedEmployees = filteredEmployees.slice(
    currentPage * rowsPerPage,
    currentPage * rowsPerPage + rowsPerPage
  );

  // ✅ Toggle Employee Status
  const toggleEmployeeStatus = async (id: string, currentStatus: "Active" | "Inactive") => {
    try {
        console.log("🔹 Updating status for employee ID:", id);

        const newStatus = currentStatus === "Active" ? "Inactive" : "Active";

        await axios.put(`http://localhost:5001/api/employees/update-status/${id}`, { status: newStatus });

        // ✅ Update UI
        setEmployees((prevEmployees) =>
            prevEmployees.map((emp) =>
                emp.id === id ? { ...emp, status: newStatus } : emp
            )
        );
    } catch (error) {
        console.error("❌ Error updating status:", error);
    }
};


  // Open Reset Password Modal
  const handleOpenResetModal = (username: string) => {
    setSelectedUser(username);
    setOpenResetModal(true);
  };

  // Close Reset Password Modal
  const handleCloseResetModal = () => {
    setOpenResetModal(false);
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <Box sx={{ backgroundColor: "#f9f9f9", minHeight: "100vh", p: 4 }}>
      {/* Page Header */}
      <Typography variant="h5" fontWeight="bold" sx={{ fontSize: "1.5rem", mb: 2, color: "#1a237e" }}>
        User List
      </Typography>

      {/* Filter Section */}
      <Paper sx={{ p: 3, mb: 3, borderRadius: 3, backgroundColor: "#ffffff", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 3, color: "#1a237e", display: "flex", alignItems: "center" }}>
          <FilterListIcon sx={{ mr: 1, fontSize: 24, color: "#007bff" }} /> Filter Users
        </Typography>

        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 2 }}>
          {/* Search By */}
          <TextField
            select
            label="Search By"
            value={searchBy}
            onChange={(e) => setSearchBy(e.target.value)}
            variant="outlined"
            size="small"
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px", background: "#f9f9f9", height: "40px" } }}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="First Name">First Name</MenuItem>
            <MenuItem value="Email">Email</MenuItem>
          </TextField>

          {/* Status Filter */}
          <TextField
            select
            label="Status Filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            variant="outlined"
            size="small"
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px", background: "#f9f9f9", height: "40px" } }}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
          </TextField>

          {/* Search Query */}
          <TextField
            placeholder="Search..."
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px", background: "#f9f9f9", height: "40px" } }}
          />

          {/* Clear Button */}
          <Button
            variant="outlined"
            startIcon={<DeleteIcon />}
            onClick={() => {
              setSearchBy("All");
              setSearchQuery("");
              setStatusFilter("All");
            }}
            sx={{
              borderColor: "#ff1744",
              fontWeight: "bold",
              borderRadius: "10px",
              background: "linear-gradient(to right, #ff1744, #ff616f)",
              color: "white",
              height: "40px",
              "&:hover": { borderColor: "#d50000", background: "linear-gradient(to right, #d50000, #ff616f)" },
            }}
          >
            Clear
          </Button>
        </Box>
      </Paper>

      {/* Table */}
      <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#1a237e" }}>
              <TableCell sx={{ fontWeight: "bold", color: "white", padding: "16px" }}>Full Name</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "white", padding: "16px" }}>Email</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "white", padding: "16px" }}>Role</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "white", padding: "16px" }}>Status</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "white", padding: "16px" }}>Actions</TableCell>
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
                              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                                <Image
                                  src="/noimage.png"
                                  alt="No employees found"
                                  width={200}
                                  height={200}
                                  priority
                                />
                                <Typography variant="h6" color="text.secondary">
                                  No users found
                                </Typography>
                              </Box>
                            </TableCell>
                          </TableRow>
                        ) : (
              paginatedEmployees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>{employee.name}</TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>{employee.role}</TableCell>
                  <TableCell>
                    <Chip
                      label={employee.status === "Active" ? "Active" : "Inactive"}
                      sx={{
                        backgroundColor: employee.status === "Active" ? "#E8F5E9" : "#FFE5B4",
                        color: employee.status === "Active" ? "#2E7D32" : "#D84315",
                        fontWeight: "bold",
                        borderRadius: "16px",
                        px: 2,
                        py: 0.5,
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Tooltip title="Toggle Active Status">
                      <Switch
                        checked={employee.status === "Active"}
                        onChange={() => toggleEmployeeStatus(employee.id, employee.status)}
                      />
                    </Tooltip>
                    <Tooltip title="Reset Password" arrow>
                      <IconButton color="primary" onClick={() => handleOpenResetModal(employee.email)}>
                        <LockResetIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Reset Password Modal */}
      <Dialog
        open={openResetModal}
        onClose={handleCloseResetModal}
        maxWidth="xs"
        fullWidth
        sx={{
          "& .MuiPaper-root": {
            borderRadius: 3,
            padding: "24px",
            boxShadow: "0px 4px 20px rgba(0,0,0,0.15)",
          },
        }}
      >
        {/* Modal Header */}
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            pb: 1,
            borderBottom: "1px solid #ddd",
          }}
        >
          <Box display="flex" alignItems="center" gap={1}>
            <LockResetIcon sx={{ color: "#1a237e" }} />
            <Typography variant="h6" fontWeight="bold">Reset Password</Typography>
          </Box>
          <IconButton onClick={handleCloseResetModal}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        {/* Modal Content */}
        <DialogContent sx={{ px: 3, pb: 2 }}>
          <Typography
            variant="body2"
            sx={{
              mb: 3,
              textAlign: "center",
              color: "#666",
              fontSize: "0.95rem",
            }}
          >
          </Typography>

          {/* New Password Field */}
          <TextField
            label="New Password"
            type={showNewPassword ? "text" : "password"}
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowNewPassword(!showNewPassword)}>
                    {showNewPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              mt: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
                backgroundColor: "#f9f9fa",
              },
            }}
          />

          {/* Confirm Password Field */}
          <TextField
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            variant="outlined"
            fullWidth
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              mt: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
                backgroundColor: "#f9f9fa",
              },
            }}
          />

          {/* Error Message */}
          {password && confirmPassword && password !== confirmPassword && (
            <Typography
              color="error"
              sx={{
                mt: 1,
                fontSize: "0.9rem",
                textAlign: "center",
                animation: "fadeIn 0.3s ease-in",
              }}
            >
              Passwords do not match!
            </Typography>
          )}
        </DialogContent>

        {/* Modal Actions */}
        <DialogActions
          sx={{
            justifyContent: "space-between",
            px: 3,
            pb: 3,
            borderTop: "1px solid #ddd",
          }}
        >
          <Button
            onClick={handleCloseResetModal}
            color="error"
            variant="text"
            sx={{
              fontWeight: "bold",
              textTransform: "none",
              ":hover": { color: "red", textDecoration: "underline" },
            }}
          >
            Clear
          </Button>
          <Button
            onClick={() => {
              alert(`Password reset for ${selectedUser}`);
              handleCloseResetModal();
            }}
            variant="contained"
            sx={{
              backgroundColor: password && confirmPassword && password === confirmPassword ? "#1a237e" : "#ccc",
              color: "white",
              fontWeight: "bold",
              textTransform: "none",
              borderRadius: 2,
              px: 4,
              ":hover": { backgroundColor: "#3949ab" },
            }}
            disabled={!password || !confirmPassword || password !== confirmPassword}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

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
                {currentPage * rowsPerPage + 1}–
                {Math.min((currentPage + 1) * rowsPerPage, filteredEmployees.length)} of {filteredEmployees.length}
              </Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))} disabled={currentPage === 0}>
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

export default UserList;