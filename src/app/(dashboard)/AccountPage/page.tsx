"use client";

import React, { useState } from "react";
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
} from "@mui/material";
import {
  Search as SearchIcon,
  Delete as DeleteIcon,
  LockReset as LockResetIcon,
  Close as CloseIcon,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { Tooltip } from "@mui/material";

const UserList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchBy, setSearchBy] = useState("All");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);
  const [openResetModal, setOpenResetModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const users = [
    { name: "Sihath Senarath", email: "Not Provided", username: "0000000000", status: "Enabled" },
    { name: "Amantha Perera", email: "Not Provided", username: "0000000000", status: "Enabled" },
    { name: "Gaindu Amarasinga", email: "Not Provided", username: "0000000001", status: "Enabled" },
    { name: "Anura Wijethunga", email: "anura@gmail.com", username: "00445328791233", status: "Enabled" },
    { name: "Mahinda Rajapaksha", email: "Not Provided", username: "01206305798", status: "Disabled" },
    { name: "Sithum Kalhara", email: "Not Provided", username: "01206305798", status: "Disabled" },
  ];

  // Filter logic
  const filteredUsers = users.filter((user) => {
    if (searchBy === "All") return true;
    if (searchBy === "Enabled") return user.status === "Enabled";
    if (searchBy === "Disabled") return user.status === "Disabled";
    if (searchBy === "First Name") return user.name.toLowerCase().includes(searchQuery.toLowerCase());
    if (searchBy === "Username") return user.username.includes(searchQuery);
    if (searchBy === "Email") return user.email.toLowerCase().includes(searchQuery.toLowerCase());
    return false;
  });

  const paginatedUsers = filteredUsers.slice(
    currentPage * rowsPerPage,
    currentPage * rowsPerPage + rowsPerPage
  );

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

  return (
    <Box sx={{ backgroundColor: "#f9f9f9", minHeight: "100vh", p: 4 }}>
      {/* Page Header */}
      <Typography variant="h5" fontWeight="bold" sx={{ fontSize: "1.5rem", mb: 2, color: "#1a237e" }}>
        User List
      </Typography>

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
            <MenuItem value="Enabled">Enabled</MenuItem>
            <MenuItem value="Disabled">Disabled</MenuItem>
            <MenuItem value="First Name">First Name</MenuItem>
            <MenuItem value="Username">Username</MenuItem>
            <MenuItem value="Email">Email</MenuItem>
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

      {/* User Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Full Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Username</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedUsers.map((user, index) => (
              <TableRow key={index}>
                <TableCell>{user.name}</TableCell>
                <TableCell sx={{ color: user.email === "Not Provided" ? "gray" : "inherit" }}>
                  {user.email}
                </TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>
                <Chip
                  label={user.status}
                  sx={{
                    backgroundColor: user.status === "Disabled" ? "#FFE5B4" : "#E8F5E9", // Light orange for disabled, green tint for enabled
                    color: user.status === "Disabled" ? "#D84315" : "#2E7D32", // Darker text color for better contrast
                    fontWeight: "bold",
                    borderRadius: "16px",
                    px: 2,
                    py: 0.5,
                  }}
                />
              </TableCell>
                <TableCell>
                  {/* Actions: Toggle Status, Reset Password */}
                  <Tooltip title={user.status === "Enabled" ? "Disable" : "Enable"} arrow>
                  <Switch defaultChecked={user.status === "Enabled"} />
                </Tooltip>
                

                <Tooltip title="Reset Password" arrow>
                  <IconButton color="primary" onClick={() => handleOpenResetModal(user.username)}>
                    <LockResetIcon />
                  </IconButton>
                </Tooltip>
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
          {Math.min((currentPage + 1) * rowsPerPage, filteredUsers.length)} of {filteredUsers.length}
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
                Math.min(prev + 1, Math.ceil(filteredUsers.length / rowsPerPage) - 1)
              )
            }
            disabled={(currentPage + 1) * rowsPerPage >= filteredUsers.length}
          >
            Next
          </Button>
        </Box>
      </Box>

    

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
      sx={{
        mt: 2,
        "& .MuiOutlinedInput-root": {
          borderRadius: "10px",
          backgroundColor: "#f9f9fa",
        },
      }}
      InputLabelProps={{ shrink: true }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={() => setShowNewPassword(!showNewPassword)}>
              {showNewPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
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
      sx={{
        mt: 2,
        "& .MuiOutlinedInput-root": {
          borderRadius: "10px",
          backgroundColor: "#f9f9fa",
        },
      }}
      InputLabelProps={{ shrink: true }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
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
    </Box>
  );
};

export default UserList;

function setPassword(arg0: string) {
  throw new Error("Function not implemented.");
}
