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
  AttachMoney,
  AccessTime,

  ToggleOn,
  ToggleOff,
} from "@mui/icons-material";

const ServicePage = () => {
  const [services, setServices] = useState([
    { id: 1, name: "Oil Change", description: "Standard oil change for smooth engine performance.", price: "$30", duration: "30 min", active: true },
    { id: 2, name: "Brake Inspection", description: "Comprehensive brake system check to ensure safety.", price: "$50", duration: "45 min", active: true },
    { id: 3, name: "Battery Replacement", description: "Quick and reliable car battery replacement service.", price: "$80", duration: "40 min", active: true },
    { id: 4, name: "Tire Rotation", description: "Extend tire life and improve handling with rotation.", price: "$40", duration: "35 min", active: true },
    { id: 5, name: "Wheel Alignment", description: "Precision wheel alignment for smoother driving.", price: "$60", duration: "50 min", active: true },
    { id: 6, name: "Full Car Service", description: "Complete inspection and maintenance service.", price: "$120", duration: "2 hours", active: true },
  ]);

  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentService, setCurrentService] = useState({
    id: null,
    name: "",
    description: "",
    price: "",
    duration: "",
    active: true,
  });

  // Open Dialog for Add or Edit
  const handleOpen = (service = null) => {
    if (service) {
      setEditMode(true);
      setCurrentService(service);
    } else {
      setEditMode(false);
      setCurrentService({ id: null, name: "", description: "", price: "", duration: "", active: true });
    }
    setOpen(true);
  };

  // Close Dialog
  const handleClose = () => {
    setOpen(false);
    setEditMode(false);
  };

  // Handle Input Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentService({ ...currentService, [e.target.name]: e.target.value });
  };
  
  // Add or Update Service
  const handleAddOrUpdateService = () => {
  if (currentService.name && currentService.description && currentService.price && currentService.duration) {
    setServices((prevServices) => {
      if (editMode) {
        // Update existing service
        return prevServices.map((s) => (s.id === currentService.id ? { ...s, ...currentService } : s));
      } else {
        // Assign unique id to the new service
        const newId = prevServices.length > 0 ? Math.max(...prevServices.map((s) => s.id)) + 1 : 1;
        return [...prevServices, { ...currentService, id: newId }];
      }
    });

    // Reset state and close modal
    setCurrentService({ id: null, name: "", description: "", price: "", duration: "", active: true });
    setEditMode(false);
    setOpen(false);
  }


      // Reset state and close modal
      setCurrentService({ id: null, name: "", description: "", price: "", duration: "", active: true });
      setEditMode(false);
      setOpen(false);
    }
  

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
                  <span style={{ color: "#2e7d32" }}>Price:</span> {service.price}
                </Typography>
                <Typography sx={{ fontWeight: "bold", fontSize: "1rem", color: "#424242" }}>
                  <span style={{ color: "#d32f2f" }}>Duration:</span> {service.duration}
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
        p: 6, // Increase padding to move fields down
        borderRadius: "20px",
        display: "flex",
        flexDirection: "column",
        gap: 1, // Add spacing between elements
      }}
    >
      <TextField
        label="Service Name"
        name="name"
        fullWidth
        variant="outlined"
        value={currentService.name}
        onChange={handleChange}
        sx={{
          mt: 2, // Moves this field further down
          mb: 2,
          "& .MuiOutlinedInput-root": {
            borderRadius: "15px",
          },
        }}
      />
      <TextField
        label="Description"
        name="description"
        fullWidth
        multiline
        rows={3}
        variant="outlined"
        value={currentService.description}
        onChange={handleChange}
        sx={{
          mb: 2,
          "& .MuiOutlinedInput-root": {
            borderRadius: "15px",
          },
        }}
      />
      <Box sx={{ display: "flex", gap: 2 }}>
        <TextField
          label="Price"
          name="price"
          fullWidth
          variant="outlined"
          value={currentService.price}
          onChange={handleChange}
          InputProps={{
            startAdornment: <InputAdornment position="start"><AttachMoney /></InputAdornment>,
          }}
          sx={{
            borderRadius: "15px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "15px",
            },
          }}
        />
        <TextField
          label="Duration"
          name="duration"
          fullWidth
          variant="outlined"
          value={currentService.duration}
          onChange={handleChange}
          InputProps={{
            startAdornment: <InputAdornment position="start"><AccessTime /></InputAdornment>,
          }}
          sx={{
            borderRadius: "15px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "15px",
            },
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