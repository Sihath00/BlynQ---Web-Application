"use client";
import React, { useState, useEffect } from "react";
import { getServicesByUID, addService, updateService, deleteService } from "../../services/serviceService";
import { auth } from "../../../../firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
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
  CircularProgress,
  Switch,
  Alert,
  Snackbar,
} from "@mui/material";
import { Edit, Delete, Add, AccessTime, Close as CloseIcon } from "@mui/icons-material";

interface Service {
  id: number;
  name: string;
  description: string;
  price: string;
  duration: string;
  active: boolean;
  station_uid?: string;
}

const ServicePage = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [stationUID, setStationUID] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentService, setCurrentService] = useState<Service>({
    id: 0,
    name: "",
    description: "",
    price: "",
    duration: "",
    active: true,
  });

  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user?.uid) {
        setStationUID(user.uid);
        await fetchServices(user.uid);
      } else {
        setError("Please log in to manage services");
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchServices = async (uid: string) => {
    setLoading(true);
    try {
      const data = await getServicesByUID(uid);
      setServices(data);
    } catch (err) {
      setError("Failed to fetch services");
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = (service: Service | null = null) => {
    setEditMode(!!service);
    setCurrentService(
      service || { id: 0, name: "", description: "", price: "", duration: "", active: true }
    );
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentService({ ...currentService, [name]: value });
  };

  const handleAddOrUpdateService = async () => {
    if (!stationUID) {
      setError("Authentication error: Please log in again");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      if (editMode) {
        await updateService(currentService.id, {
          name: currentService.name.trim(),
          description: currentService.description.trim(),
          price: parseFloat(currentService.price),
          duration: parseInt(currentService.duration, 10),
          active: currentService.active,
        });
      } else {
        await addService({
          name: currentService.name.trim(),
          description: currentService.description.trim(),
          price: parseFloat(currentService.price),
          duration: parseInt(currentService.duration, 10),
          active: currentService.active,
          station_uid: stationUID,
        });
      }
      await fetchServices(stationUID);
      handleClose();
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to save service. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteService = (id: number) => {
    setDeleteId(id);
    // setDeleteConfirmOpen(true);
    confirmDeleteService();
  };

  const confirmDeleteService = async () => {
    if (deleteId !== null && stationUID) {
      setLoading(true);
      try {
        await deleteService(deleteId);
        await fetchServices(stationUID);
      } catch (err) {
        setError("Failed to delete service");
      } finally {
        setLoading(false);
        setDeleteConfirmOpen(false);
        setDeleteId(null);
      }
    }
  };

  const handleToggleActive = async (id: number, currentActiveState: boolean) => {
    const serviceToUpdate = services.find((service) => service.id === id);
    if (!serviceToUpdate) {
      setError("Service not found");
      return;
    }

    setLoading(true);
    try {
      await updateService(id, {
        name: serviceToUpdate.name,
        description: serviceToUpdate.description,
        price: parseFloat(serviceToUpdate.price),
        duration: parseInt(serviceToUpdate.duration, 10),
        active: !currentActiveState,
      });
      if (stationUID) await fetchServices(stationUID);
    } catch (err) {
      setError("Failed to update service status");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 4, backgroundColor: "#f4f6f8", minHeight: "100vh" }}>
      {error && <Alert severity="error">{error}</Alert>}

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
      <Typography variant="h5" fontWeight="bold" sx={{ fontSize: "1.5rem", color: "#1a237e" }}>
          Manage Services
        </Typography>
        {/* Add Service Button */}
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

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : services.length === 0 ? (
        <Box sx={{ textAlign: "center", mt: 6 }}>
          <img
            src="/noservice.png"
            alt="No Services Available"
            style={{ maxWidth: "800px", width: "100%", margin: "0 auto" }}
          />
          <Typography variant="h6" sx={{ mt: 2, color: "#555" }}>
            No services available. Add a new service to get started.
          </Typography>
        </Box>
      ) : (
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
               <Switch checked={service.active} onChange={() => handleToggleActive(service.id, service.active)} />
             </Tooltip>
               </Box>
             </Paper>
           </Grid>
            
          ))}
        </Grid>
      )}

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
      {editMode ? "Edit Service" : "Add New Service"}
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