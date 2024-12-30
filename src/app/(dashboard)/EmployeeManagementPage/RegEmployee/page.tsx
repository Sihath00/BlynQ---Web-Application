"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Grid,
  Divider,
} from "@mui/material";

const AddEmployeePage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    civilState: "",
    personalID: "",
    role: "",
    jobRole: "",
    status: "",
    initials: "",
    remark: "",
    address1: "",
    address2: "",
    city: "",
    county: "",
    postcode: "",
    mobile: "",
    telephone: "",
    email: "",
  });

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    console.log("Submitted Form Data", formData);
  };

  return (
    <Box sx={{ p: 4, backgroundColor: "#f5f7fb", minHeight: "100vh" }}>
      {/* Page Header */}
  <Box
    sx={{
      mb: 4,
      pb: 2,
    }}
  >
    <Typography
      variant="h4"
      fontWeight="bold"
      sx={{ fontSize: "1.5rem", color: "#212121" }}
    >
      Add Employee
    </Typography>
  </Box>

      {/* Outer Box */}
      <Box
        sx={{
          p: 4,
          backgroundColor: "white",
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        {/* Personal Details Section */}
        <Typography variant="h6" fontWeight="bold" mb={2}>
          Personal Details
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="First Name *"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Last Name *"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Date of Birth"
              name="dateOfBirth"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Gender</InputLabel>
              <Select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                label="Gender"
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Personal ID Number"
              name="personalID"
              value={formData.personalID}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Status</InputLabel>
              <Select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                label="Status"
              >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Role Field */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Role</InputLabel>
              <Select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                label="Role"
              >
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="Manager">Manager</MenuItem>
                <MenuItem value="Employee">Employee</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Job Role Field */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Job Role"
              name="jobRole"
              value={formData.jobRole}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
            />
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        {/* Address Section */}
        <Typography variant="h6" fontWeight="bold" mb={2}>
          Address
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Address Line 1 *"
              name="address1"
              value={formData.address1}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Address Line 2 (optional)"
              name="address2"
              value={formData.address2}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="City *"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="County"
              name="county"
              value={formData.county}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Postcode *"
              name="postcode"
              value={formData.postcode}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
            />
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        {/* Contact Details Section */}
        <Typography variant="h6" fontWeight="bold" mb={2}>
          Contact Details
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Mobile Number *"
              name="mobile"
              value={formData.mobile}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Email Address *"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
            />
          </Grid>
        </Grid>

        {/* Save Button */}
        <Box mt={4} display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            sx={{
              px: 4,
              py: 1,
              backgroundColor: "#1a73e8",
              ":hover": { backgroundColor: "#135abf" },
            }}
            onClick={handleSubmit}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AddEmployeePage;