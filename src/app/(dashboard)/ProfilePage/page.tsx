"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Grid,
  IconButton,
  Card,
  CardMedia,
  CardActions,
  FormHelperText,
} from "@mui/material";
import { Edit, Save, UploadFile, Delete } from "@mui/icons-material";
import { useDropzone } from "react-dropzone";

const ServiceCenterProfile = () => {
  const [editMode, setEditMode] = useState(true);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [serviceCenter, setServiceCenter] = useState({
    name: "",
    location: "",
    latitude: "",
    longitude: "",
    description: "",
    serviceProvider1: "",
    contact1: "",
    serviceProvider2: "",
    contact2: "",
    images: [] as string[],
  });

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setServiceCenter({ ...serviceCenter, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear errors on typing
  };

  // Image Upload Handling (Drag & Drop)
  const onDrop = (acceptedFiles: File[]) => {
    const validFiles = acceptedFiles.filter((file) =>
      ["image/png", "image/jpeg", "image/jpg"].includes(file.type)
    );

    if (validFiles.length !== acceptedFiles.length) {
      alert("Only .png, .jpg, .jpeg formats are allowed.");
      return;
    }

    if (serviceCenter.images.length + validFiles.length > 5) {
      setErrors({ ...errors, images: "You can upload up to 5 images only." });
      return;
    }

    // Convert files to Data URLs
    const fileReaders = validFiles.map((file) => {
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(fileReaders).then((urls) => {
      setServiceCenter((prev) => ({
        ...prev,
        images: [...prev.images, ...urls],
      }));
    });
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/jpeg": [], "image/png": [] },
    maxFiles: 5,
  });

  // Handle deleting an image
  const handleDeleteImage = (index: number) => {
    const updatedImages = [...serviceCenter.images];
    updatedImages.splice(index, 1);
    setServiceCenter({ ...serviceCenter, images: updatedImages });
  };

  // Form validation
  const validateForm = () => {
    let newErrors: { [key: string]: string } = {};
    if (!serviceCenter.name) newErrors.name = "Service Center Name is required.";
    if (!serviceCenter.location) newErrors.location = "Location is required.";
    if (!serviceCenter.latitude) newErrors.latitude = "Latitude is required.";
    if (!serviceCenter.longitude) newErrors.longitude = "Longitude is required.";
    if (!serviceCenter.description) newErrors.description = "Description is required.";
    if (!serviceCenter.serviceProvider1) newErrors.serviceProvider1 = "First Service Provider Name is required.";
    if (!serviceCenter.contact1) newErrors.contact1 = "First Contact Number is required.";
    if (!serviceCenter.serviceProvider2) newErrors.serviceProvider2 = "Second Service Provider Name is required.";
    if (!serviceCenter.contact2) newErrors.contact2 = "Second Contact Number is required.";
    if (serviceCenter.images.length === 0) newErrors.images = "At least one image is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle saving the form
  const handleSave = () => {
    if (validateForm()) {
      setEditMode(false);
    }
  };

  return (
    <Box sx={{ p: 3, backgroundColor: "#f4f6f8", minHeight: "100vh" }}>
      {/* Page Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h5" fontWeight="bold" sx={{ fontSize: "1.5rem", color: "#1a237e" }}>
          Service Center Profile
        </Typography>
        <Button
          variant="contained"
          startIcon={editMode ? <Save /> : <Edit />}
          onClick={() => (editMode ? handleSave() : setEditMode(true))}
          sx={{ background: "linear-gradient(to right, #007bff, #00c6ff)", color: "white" }}
        >
          {editMode ? "Save" : "Edit"}
        </Button>
      </Box>

      {/* Profile Form */}
      <Paper sx={{ p: 3, borderRadius: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField label="Service Center Name" name="name" fullWidth variant="outlined" value={serviceCenter.name} onChange={handleChange} disabled={!editMode} error={!!errors.name} helperText={errors.name} />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Location" name="location" fullWidth variant="outlined" value={serviceCenter.location} onChange={handleChange} disabled={!editMode} error={!!errors.location} helperText={errors.location} />
          </Grid>
          <Grid item xs={6}><TextField label="Latitude" name="latitude" fullWidth variant="outlined" value={serviceCenter.latitude} onChange={handleChange} disabled={!editMode} error={!!errors.latitude} helperText={errors.latitude} /></Grid>
          <Grid item xs={6}><TextField label="Longitude" name="longitude" fullWidth variant="outlined" value={serviceCenter.longitude} onChange={handleChange} disabled={!editMode} error={!!errors.longitude} helperText={errors.longitude} /></Grid>
          <Grid item xs={12}><TextField label="Description" name="description" fullWidth multiline rows={3} variant="outlined" value={serviceCenter.description} onChange={handleChange} disabled={!editMode} error={!!errors.description} helperText={errors.description} /></Grid>

          {/* Service Providers */}
          <Grid item xs={6}><TextField label="Service Provider 1" name="serviceProvider1" fullWidth variant="outlined" value={serviceCenter.serviceProvider1} onChange={handleChange} disabled={!editMode} error={!!errors.serviceProvider1} helperText={errors.serviceProvider1} /></Grid>
          <Grid item xs={6}><TextField label="Contact Number 1" name="contact1" fullWidth variant="outlined" value={serviceCenter.contact1} onChange={handleChange} disabled={!editMode} error={!!errors.contact1} helperText={errors.contact1} /></Grid>
          <Grid item xs={6}><TextField label="Service Provider 2" name="serviceProvider2" fullWidth variant="outlined" value={serviceCenter.serviceProvider2} onChange={handleChange} disabled={!editMode} error={!!errors.serviceProvider2} helperText={errors.serviceProvider2} /></Grid>
          <Grid item xs={6}><TextField label="Contact Number 2" name="contact2" fullWidth variant="outlined" value={serviceCenter.contact2} onChange={handleChange} disabled={!editMode} error={!!errors.contact2} helperText={errors.contact2} /></Grid>

            {/* Image Upload */}
            {editMode && (
              <Grid item xs={12}>
              <div {...getRootProps()} style={{ border: "2px dashed #007bff", padding: "20px", textAlign: "center", cursor: "pointer", borderRadius: "10px", backgroundColor: "#f9f9f9" }}>
                <input {...getInputProps()} />
                <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                <img src="/upload.png" alt="Upload Illustration" style={{ maxWidth: "20%", height: "auto" }} />
                </Box>
                <Typography fontWeight="bold">Drop or Select file</Typography>
                <Typography color="error">Please upload only landscape images.</Typography>
                <Typography variant="caption">Supported file formats: .png, .jpg, .jpeg</Typography>
                {errors.images && <FormHelperText error>{errors.images}</FormHelperText>}
              </div>
              </Grid>
            )}

            {/* Image Preview */}
            {serviceCenter.images.length > 0 && (
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  {serviceCenter.images.slice(0, 5).map((image, index) => (
                    <Grid item xs={6} sm={4} md={3} lg={2.4} key={index}>
                      <Card 
                        sx={{ 
                          position: "relative",
                          width: "100%",
                          height: "150px",
                          borderRadius: 2,
                          overflow: "hidden",
                          '&:hover': {
                            boxShadow: 6
                          }
                        }}
                      >
                        <CardMedia 
                          component="img"
                          sx={{
                            height: "100%",
                            objectFit: "cover"
                          }}
                          image={image}
                          alt={`uploaded ${index}`}
                        />
                        {editMode && (
                          <CardActions 
                            sx={{ 
                              position: "absolute",
                              top: 0,
                              right: 0,
                              p: 0.5,
                              background: 'linear-gradient(to bottom, rgba(0,0,0,0.5), transparent)'
                            }}
                          >
                            <IconButton 
                              onClick={() => handleDeleteImage(index)}
                              sx={{ 
                                color: "white",
                                backgroundColor: "rgba(0,0,0,0.5)",
                                '&:hover': {
                                  bgcolor: "rgba(211, 47, 47, 0.8)"
                                }
                              }}
                              size="small"
                            >
                              <Delete fontSize="small" />
                            </IconButton>
                          </CardActions>
                          )}
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          )}
        </Grid>
      </Paper>
    </Box>
  );
};

export default ServiceCenterProfile;