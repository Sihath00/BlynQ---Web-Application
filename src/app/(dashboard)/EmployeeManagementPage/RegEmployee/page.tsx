"use client";

import { getAuth } from "firebase/auth";
import { addEmployee } from "../../../services/employeeService";
import { onAuthStateChanged } from "firebase/auth";
import React, { useState, useEffect } from "react";
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
  type EmployeeFormData = {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    gender: string;
    personalID: string;
    role: string;
    jobRole: string;
    status: string;
    address1: string;
    address2: string;
    city: string;
    county: string;
    postcode: string;
    mobile: string;
    email: string;
  };
  
  // Use this type when defining formData state
  const [formData, setFormData] = useState<EmployeeFormData>({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    personalID: "",
    role: "",
    jobRole: "",
    status: "",
    address1: "",
    address2: "",
    city: "",
    county: "",
    postcode: "",
    mobile: "",
    email: "",
  });
  

  const [uid, setUid] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // ✅ Fetch Firebase Authenticated User UID
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
      } else {
        console.error("❌ User not authenticated");
      }
    });

    return () => unsubscribe();
  }, []);

  // ✅ Handle Input Change
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }> | SelectChangeEvent<string>
  ) => {
    const { name, value } = e.target as HTMLInputElement | { name?: string; value: unknown };

    // ✅ Ensure only numeric values for `mobile` & `personalID`
    if (name === "mobile" || name === "personalID") {
      if (!/^\d*$/.test(value as string)) return; // Allow only numbers
      if (name === "mobile" && (value as string).length > 10) return; // Restrict mobile to 10 digits
    }

    setFormData({ ...formData, [name as string]: value });
    setErrors({ ...errors, [name as string]: "" }); // Clear errors on valid input
  };

  // ✅ Validate Email Format
  const validateEmail = (email: string) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

  // ✅ Validate Form Before Submission
  const validateForm = () => {
    let valid = true;
    let newErrors: { [key: string]: string } = {};

    ["firstName", "lastName", "dateOfBirth", "gender", "personalID", "role", "status", "address1", "city", "postcode", "mobile", "email"].forEach((field) => {
      if (!formData[field as keyof EmployeeFormData]) {
        newErrors[field as keyof EmployeeFormData] = `${field.replace(/([A-Z])/g, " $1")} is required`;
        valid = false;
      }
    });
    

    if (formData.mobile.length !== 10) {
      newErrors.mobile = "Mobile Number must be exactly 10 digits";
      valid = false;
    }

    if (!validateEmail(formData.email)) {
      newErrors.email = "Invalid Email Address";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // ✅ Submit Form Data to Backend
  const handleSubmit = async () => {
    if (!validateForm()) return; // Stop submission if form is invalid
  
    const auth = getAuth();
    const user = auth.currentUser;
  
    if (!user) {
      alert("❌ User not authenticated");
      return;
    }
  
    const employeeData = {
      uid: user.uid, // ✅ Correct UID
      firstName: formData.firstName,
      lastName: formData.lastName,
      dateOfBirth: formData.dateOfBirth, // ✅ Keep it as "YYYY-MM-DD"
      gender: formData.gender,
      personalID: formData.personalID, // ✅ Matched to Postman
      role: formData.role,
      jobRole: formData.jobRole,
      status: formData.status,
      address1: formData.address1,
      address2: formData.address2,
      city: formData.city,
      county: formData.county,
      postcode: formData.postcode,
      mobile: formData.mobile,
      email: formData.email,
    };
  
    try {
      const response = await addEmployee(employeeData);
      if (response.error) {
        alert("❌ Failed to add employee: " + response.error);
      } else {
        alert("✅ Employee added successfully!");
        window.location.href = "/EmployeeManagementPage"; // Redirect to Employee List
      }
    } catch (error) {
      console.error("❌ Error adding employee:", error);
      alert("❌ Unexpected error occurred");
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
                name="gender"
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