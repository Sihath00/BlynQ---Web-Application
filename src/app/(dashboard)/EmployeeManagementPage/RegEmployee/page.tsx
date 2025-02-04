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
  SelectChangeEvent,
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

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    personalID: "",
    role: "",
    status: "",
    address1: "",
    city: "",
    postcode: "",
    mobile: "",
    email: "",
  });

  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }> | SelectChangeEvent<string>) => {
      const { name, value } = e.target as HTMLInputElement | { name?: string; value: unknown };

    // Ensure only numeric values for mobile and personal ID
    if (name === "mobile" || name === "personalID") {
      if (!/^\d*$/.test(value as string)) return; // Allow only numbers
      if (name === "mobile" && (value as string).length > 10) return; // Restrict mobile to 10 digits
    }

    setFormData({ ...formData, [name as string]: value });
    setErrors({ ...errors, [name as string]: "" }); // Clear errors on valid input
  };

  const validateEmail = (email: string) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };
  
  const validateForm = () => {
    let valid = true;
    let newErrors = { ...errors };
  
    if (!formData.firstName) {
      newErrors.firstName = "First Name is required";
      valid = false;
    }
    if (!formData.lastName) {
      newErrors.lastName = "Last Name is required";
      valid = false;
    }
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Date of Birth is required";
      valid = false;
    }
    if (!formData.gender) {
      newErrors.gender = "Gender is required";
      valid = false;
    }
    if (!formData.personalID) {
      newErrors.personalID = "Personal ID is required";
      valid = false;
    }
    if (!formData.role) {
      newErrors.role = "Role is required";
      valid = false;
    }
    if (!formData.status) {
      newErrors.status = "Status is required";
      valid = false;
    }
    if (!formData.address1) {
      newErrors.address1 = "Address Line 1 is required";
      valid = false;
    }
    if (!formData.city) {
      newErrors.city = "City is required";
      valid = false;
    }
    if (!formData.postcode) {
      newErrors.postcode = "Postcode is required";
      valid = false;
    }
    if (!formData.mobile) {
      newErrors.mobile = "Mobile Number is required";
      valid = false;
    } else if (formData.mobile.length !== 10) {
      newErrors.mobile = "Mobile Number must be exactly 10 digits";
      valid = false;
    }
    if (!formData.email) {
      newErrors.email = "Email Address is required";
      valid = false;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Invalid Email Address";
      valid = false;
    }
  
    setErrors(newErrors);
    return valid;
  };
  
  function isNumeric(value: any) {
    return !isNaN(value);
  }
  const handleMobileChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    if (isNumeric(value) && value.length <= 10) {
      setFormData({ ...formData, [name]: value });
      setErrors({ ...errors, [name]: "" });
    }
  };
  
  const handleSubmit = () => {
    if (validateForm()) {
      console.log("Submitted Form Data", formData);
      window.location.href = "/EmployeeManagementPage"; // Redirect after successful validation
    }
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
        <Typography variant="h5" fontWeight="bold" sx={{ fontSize: "1.5rem", color: "#1a237e" }}>
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
              onChange={(e) => handleInputChange(e as SelectChangeEvent<string>)}
              fullWidth
              variant="outlined"
              error={!!errors.firstName}
              helperText={errors.firstName}
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
              error={!!errors.lastName}
              helperText={errors.lastName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Date of Birth *"
              name="dateOfBirth"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              error={!!errors.dateOfBirth}
              helperText={errors.dateOfBirth}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined" error={!!errors.gender}>
              <InputLabel>Gender</InputLabel>
              <Select
                name="Gender"
                value={formData.gender}
                onChange={handleInputChange}
                label="Gender *"
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
              {errors.gender && <Typography color="error">{errors.gender}</Typography>}
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Personal ID Number *"
              name="personalID"
              value={formData.personalID}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              error={!!errors.personalID}
              helperText={errors.personalID}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined" error={!!errors.status}>
              <InputLabel>Status *</InputLabel>
              <Select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                label="Status *"
              >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              </Select>
              {errors.status && <Typography color="error">{errors.status}</Typography>}
            </FormControl>
          </Grid>

          {/* Role Field */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined" error={!!errors.role}>
              <InputLabel>Role *</InputLabel>
              <Select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                label="Role"
              >
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="Manager">Manager</MenuItem>
                <MenuItem value="Staff">Employee</MenuItem>
                
              </Select>
              {errors.role && <Typography color="error">{errors.role}</Typography>}
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
              error={!!errors.address1}
              helperText={errors.address1}
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
              error={!!errors.city}
              helperText={errors.city}
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
              error={!!errors.postcode}
              helperText={errors.postcode}
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
            error={!!errors.mobile}
            helperText={errors.mobile}
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
              error={!!errors.email}
              helperText={errors.email}
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
          onClick={() => {
            handleSubmit();
            if (validateForm()) {
              window.location.href = "/EmployeeManagementPage";
            }
          }}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Box>
  );
};


export default AddEmployeePage;


