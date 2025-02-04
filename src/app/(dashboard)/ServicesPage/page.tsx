"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tooltip,
  IconButton,
  CardContent,
  InputAdornment,
} from "@mui/material";
import {
  Edit,
  Delete,
  Add,
  AccessTime,

  ToggleOn,
  ToggleOff,
} from "@mui/icons-material";

const ServicePage = () => {
  const [services, setServices] = useState<{ id: number; name: string; description: string; price: string; duration: string; active: boolean }[]>([]);

  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentService, setCurrentService] = useState({
    id: 0,
    name: "",
    description: "",
    price: "",
    duration: "",
    active: true,
  });

  // Open Dialog for Add or Edit
  const handleOpen = (service: { id: number; name: string; description: string; price: string; duration: string; active: boolean } | null = null) => {
    if (service) {
      setEditMode(true);
      setCurrentService(service);
    } else {
      setEditMode(false);
      setCurrentService({ id: 0, name: "", description: "", price: "", duration: "", active: true });
    }
    setOpen(true);
  };

  // Close Dialog
  const handleClose = () => {
    setOpen(false);
    setEditMode(false);
  };

  const [errors, setErrors] = useState({
    name: "",
    description: "",
    price: "",
    duration: "",
  });
  
  // Handle Input Change with Validation
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
  
    if (name === "price") {
      if (!/^\d*\.?\d*$/.test(value)) return; // Allow only numbers and decimals
      setCurrentService({ ...currentService, price: value });
    } 
    
    else if (name === "duration") {
      const numericValue = value.replace(/\D/g, ""); // Remove any non-numeric characters
      setCurrentService({ ...currentService, duration: numericValue });
    } 
    
    else {
      setCurrentService({ ...currentService, [name]: value });
    }
  
    // Clear errors when user types
    setErrors({ ...errors, [name]: "" });
  };
  
  
  // Validate Form Before Submitting
  const validateForm = () => {
    let newErrors = { name: "", description: "", price: "", duration: "" };
    let isValid = true;
  
    if (!currentService.name.trim()) {
      newErrors.name = "Service Name is required";
      isValid = false;
    }
    if (!currentService.description.trim()) {
      newErrors.description = "Description is required";
      isValid = false;
    }
    if (!currentService.price.trim() || isNaN(Number(currentService.price))) {
      newErrors.price = "Valid Price is required";
      isValid = false;
    }
    if (!currentService.duration.trim() || isNaN(Number(currentService.duration))) {
      newErrors.duration = "Valid Duration is required";
      isValid = false;
    }
  
    setErrors(newErrors);
    return isValid;
  };
  
  // Add or Update Service
  const handleAddOrUpdateService = () => {
    if (!validateForm()) return; // Prevent submission if validation fails
  
    setServices((prevServices) => {
      if (editMode) {
        return prevServices.map((s) => (s.id === currentService.id ? { ...s, ...currentService } : s));
      } else {
        const newId = prevServices.length > 0 ? Math.max(...prevServices.map((s) => s.id)) + 1 : 1;
        return [...prevServices, { ...currentService, id: newId }];
      }
    });
  
    setCurrentService({ id: 0, name: "", description: "", price: "", duration: "", active: true });
    setEditMode(false);
    setOpen(false);
  };

  

  // Delete Service
  const handleDeleteService = (id: number) => {
    setServices(services.filter((service) => service.id !== id));
  };

  const handleToggleActive = (id: number) => {
    setServices((prevServices) =>
      prevServices.map((service) =>
        service.id === id ? { ...service, active: !service.active } : service
      )
    );
  };

  return (
    <Box sx={{ p: 4, backgroundColor: "#f4f6f8", minHeight: "100vh" }}>
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
        <Typography variant="h5" fontWeight="bold" sx={{ fontSize: "1.5rem", color: "#1a237e" }}>
          Manage Services
        </Typography>
        <Button
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
          Add Service
        </Button>
      </Box>

      {/* Service Cards */}
{services.length > 0 ? (
  <Grid container spacing={3}>
    {services.map((service) => (
      <Grid item xs={12} sm={6} md={4} key={service.id}>
        <Paper
          elevation={8}
          sx={{
            borderRadius: "15px",
            overflow: "hidden",
            transition: "0.3s",
            background: "#ffffff",
            boxShadow: "0px 5px 20px rgba(0, 0, 0, 0.1)",
            "&:hover": {
              boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.3)",
              transform: "scale(1.04)",
            },
          }}
        >
          {/* Card Header */}
          <Box
            sx={{
              background: service.active ? "linear-gradient(to right, #007bff, #00c6ff)" : "#d32f2f",
              p: 2,
              color: "white",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "1.3rem",
              borderTopLeftRadius: "15px",
              borderTopRightRadius: "15px",
            }}
          >
            {service.name}
          </Box>

          {/* Card Body */}
          <CardContent sx={{ p: 3, textAlign: "center" }}>
            <Typography variant="body1" color="text.secondary">
              {service.description}
            </Typography>
            <Typography sx={{ mt: 2, fontWeight: "bold", fontSize: "1rem", color: "#424242" }}>
              <span style={{ color: "#2e7d32" }}>Price:</span> Rs. {parseFloat(service.price).toFixed(2)}
            </Typography>
            <Typography sx={{ fontWeight: "bold", fontSize: "1rem", color: "#424242" }}>
              <span style={{ color: "#d32f2f" }}>Duration:</span> {service.duration} min
            </Typography>
          </CardContent>

          {/* Actions */}
          <Box sx={{ display: "flex", justifyContent: "center", gap: 1, pb: 2 }}>
            <Tooltip title="Edit">
              <IconButton sx={{ color: "#ffa000" }} onClick={() => handleOpen(service)}>
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton sx={{ color: "#d32f2f" }} onClick={() => handleDeleteService(service.id)}>
                <Delete />
              </IconButton>
            </Tooltip>
            <Tooltip title={service.active ? "Deactivate" : "Activate"}>
              <IconButton sx={{ color: service.active ? "#007bff" : "#d32f2f" }} onClick={() => handleToggleActive(service.id)}>
                {service.active ? <ToggleOn /> : <ToggleOff />}
              </IconButton>
            </Tooltip>
          </Box>
        </Paper>
      </Grid>
    ))}
  </Grid>
) : (
  <Box sx={{ textAlign: "center", mt: 6 }}>
    <img
      src="/noservice.png" 
      alt="No Services Available"
      style={{ maxWidth: "800px", width: "400%", margin: "0 auto" }}
    />
    <Typography variant="h6" sx={{ mt: 2, color: "#555" }}>
      No services available. Add a new service to get started.
    </Typography>
  </Box>
)}
      {/* Add Service Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        sx={{
          "& .MuiPaper-root": {
            borderRadius: "20px", // Rounded corners for the entire modal
            background: "#fff",
            boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.15)",
        },
      }}
    >
      {/* Header */}
      <DialogTitle
        sx={{
          fontWeight: "bold",
          textAlign: "center",
          color: "#1a237e",
          padding: "16px",
          fontSize: "1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
          background: "transparent",
          borderBottom: "1px solid #ddd",
          borderTopLeftRadius: "20px",
          borderTopRightRadius: "20px",
        }}
      >
        Add New Service
      </DialogTitle>

      <DialogContent
  sx={{
    p: 6,
    display: "flex",
    flexDirection: "column",
    gap: 1,
  }}
>
  {/* Service Name Field */}
  <TextField
    label="Service Name"
    name="name"
    fullWidth
    variant="outlined"
    value={currentService.name}
    onChange={handleChange}
    error={!!errors.name}
    helperText={errors.name}
    sx={{
      mt: 2,
      mb: 2,
      "& .MuiOutlinedInput-root": { borderRadius: "15px" },
    }}
  />

  {/* Description Field */}
  <TextField
    label="Description"
    name="description"
    fullWidth
    multiline
    rows={3}
    variant="outlined"
    value={currentService.description}
    onChange={handleChange}
    error={!!errors.description}
    helperText={errors.description}
    sx={{
      mb: 2,
      "& .MuiOutlinedInput-root": { borderRadius: "15px" },
    }}
  />

  {/* Price & Duration Fields */}
  <Box sx={{ display: "flex", gap: 2 }}>
    <TextField
      label="Price"
      name="price"
      fullWidth
      variant="outlined"
      value={currentService.price}
      onChange={handleChange}
      error={!!errors.price}
      helperText={errors.price}
      InputProps={{
        startAdornment: <InputAdornment position="start">Rs.</InputAdornment>,
      }}
      sx={{
        "& .MuiOutlinedInput-root": { borderRadius: "15px" },
      }}
    />

<TextField
  label="Duration"
  name="duration"
  fullWidth
  variant="outlined"
  value={currentService.duration}
  onChange={handleChange}
  error={!!errors.duration}
  helperText={errors.duration}
  InputProps={{
    startAdornment: <InputAdornment position="start"><AccessTime /></InputAdornment>,
    inputProps: { inputMode: "numeric", pattern: "[0-9]*" }, // Allow only numeric input
  }}
  sx={{
    "& .MuiOutlinedInput-root": { borderRadius: "15px" },
  }}
/>
  </Box>
</DialogContent>

    <DialogActions sx={{ justifyContent: "space-between", px: 4, pb: 3 }}>
      {/* Cancel Button */}
      <Button
        onClick={handleClose}
        sx={{
          background: "rgba(211, 47, 47, 0.1)", // Light red background
          color: "#d32f2f",
          fontWeight: "bold",
          borderRadius: "30px",
          textTransform: "uppercase",
          padding: "12px 24px",
          fontSize: "0.9rem",
          transition: "0.3s",
          ":hover": {
            background: "#d32f2f",
            color: "white",
            boxShadow: "0px 4px 12px rgba(211, 47, 47, 0.4)",
          },
        }}
      >
        Cancel
      </Button>

      {/* Save (Add Service) Button */}
      <Button
        onClick={handleAddOrUpdateService}
        variant="contained"
        sx={{
          background: "linear-gradient(135deg, #007bff, #00c6ff)", // Gradient Blue
          color: "white",
          borderRadius: "30px",
          px: 5,
          py: 1.5,
          textTransform: "uppercase",
          fontWeight: "bold",
          fontSize: "1rem",
          transition: "0.3s",
          boxShadow: "0px 5px 15px rgba(0, 123, 255, 0.3)",
          ":hover": {
            background: "linear-gradient(135deg, #0056b3, #0099cc)",
            transform: "scale(1.05)",
            boxShadow: "0px 8px 20px rgba(0, 123, 255, 0.4)",
          },
        }}
      >
        Save
      </Button>
    </DialogActions>
    </Dialog>
    </Box>
  );
};

export default ServicePage;