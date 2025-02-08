"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter  } from "next/navigation"; // ✅ Fixed import
import { getEmployeeByPersonalID } from "../../../services/employeeService";

import {
  Tabs,
  Tab,
  Box,
  Typography,
  Avatar,
  Grid,
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
} from "@mui/material";
import {
  Person as PersonIcon,
  Assignment as ActivityIcon,
  Event as ScheduleIcon,
  History as HistoryIcon,
  Notes as NotesIcon,
  PhotoCamera as PhotoCameraIcon,
  LocationOn as LocationIcon,
  CheckCircle as CheckCircleIcon,
  Badge as BadgeIcon,
  Work as WorkIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Wc as GenderIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";


const EmployeeProfile = () => {
  const params = useParams();
  const personal_id = Array.isArray(params?.personal_id) ? params.personal_id[0] : params.personal_id || "";  
  const [selectedTab, setSelectedTab] = useState(0);
  const [avatar, setAvatar] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState({ from: "", to: "" });
  const [activityFilter, setActivityFilter] = useState("All");
  const [employee, setEmployee] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };
  useEffect(() => {
    console.log("🔍 Checking personal_id before API call:", personal_id); // Debug Log

    if (!personal_id || personal_id === "undefined") {
        console.error("❌ Error: Personal ID is missing or invalid");
        return;
    }

    const fetchEmployee = async () => {
        try {
            console.log("🔍 Fetching employee with ID:", personal_id);
            const data = await getEmployeeByPersonalID(personal_id);
            setEmployee(data);
        } catch (error) {
            console.error("❌ Error fetching employee:", error);
        } finally {
            setLoading(false);
        }
    };

    fetchEmployee();
}, [personal_id]);

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  
  const workingHistory = [
    {
      date: "30/12/2024",
      clockInTime: "09:23",
      clockOutTime: "17:44",
      client: "Jean McAuley",
      service: "Oil Change",
      status: "Completed",
    },
    {
      date: "30/12/2024",
      clockInTime: "10:04",
      clockOutTime: "18:23",
      client: "Jacqueline Young",
      service: "Brake Inspection",
      status: "Completed",
    },
    {
      date: "29/12/2024",
      clockInTime: "11:44",
      clockOutTime: "19:04",
      client: "Edward Thomas",
      service: "Tire Replacement",
      status: "Completed",
    },
    {
      date: "28/12/2024",
      clockInTime: "12:07",
      clockOutTime: "20:32",
      client: "Barbara Avis",
      service: "Engine Diagnostics",
      status: "Completed",
    },
    {
      date: "27/12/2024",
      clockInTime: "13:42",
      clockOutTime: "21:06",
      client: "Kathy Lynch",
      service: "Alignment Check",
      status: "Completed",
    },
  ];

  const activities = [
    {
      type: "Accepted Schedule",
      category: "Task",
      date: "2024-12-06",
      time: "09:00",
      client: "Michael Smith",
    },
    {
      type: "Clock In",
      category: "Attendance",
      date: "2024-12-06",
      time: "09:05",
      client: "N/A",
    },
    {
      type: "Clock Out",
      category: "Attendance",
      date: "2024-12-06",
      time: "18:00",
      client: "N/A",
    },
  ];

  const weeklySchedule = [
    {
      day: "Monday",
      tasks: [
        { description: "Complete oil change for Client A", status: "Completed" },
        { description: "Review task list with Client B", status: "Pending" },
      ],
    },
    {
      day: "Tuesday",
      tasks: [
        { description: "Attend team meeting at 10 AM", status: "Completed" },
        { description: "Prepare monthly report", status: "Pending" },
      ],
    },
    {
      day: "Wednesday",
      tasks: [],
    },
    {
      day: "Thursday",
      tasks: [{ description: "Client inspection at 2 PM", status: "Pending" }],
    },
    {
      day: "Friday",
      tasks: [
        { description: "Weekly performance review", status: "Completed" },
        { description: "Plan for next week's schedule", status: "Pending" },
      ],
    },
  ];

  const filteredHistory = workingHistory.filter((entry) => {
    const matchesSearch = entry.client.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDate =
      (!dateFilter.from || new Date(entry.date) >= new Date(dateFilter.from)) &&
      (!dateFilter.to || new Date(entry.date) <= new Date(dateFilter.to));
    return matchesSearch && matchesDate;
  });

  const paginatedHistory = filteredHistory.slice(
    currentPage * rowsPerPage,
    currentPage * rowsPerPage + rowsPerPage
  );

  const filteredActivities = activities.filter((activity) => {
    const matchesFilter = activityFilter === "All" || activity.type === activityFilter;
    const matchesSearch =
      !searchQuery || activity.client.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handlePageChange = (direction: "next" | "prev") => {
    if (direction === "next") {
      setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(filteredHistory.length / rowsPerPage) - 1));
    } else {
      setCurrentPage((prev) => Math.max(prev - 1, 0));
    }
  };

  return (
    <Box sx={{ backgroundColor: "#f9f9f9", minHeight: "100vh", p: 4 }}>

      {/* Page Header */}
  <Box
    sx={{
      mb: 4,
      pb: 2,
    }}
  >
    <Typography variant="h5" fontWeight="bold" sx={{ fontSize: "1.5rem", color: "#1a237e" }}>
      Employee Profile
    </Typography>
  </Box>
      {/* Profile Header */}
      <Box
        sx={{
          backgroundColor: "#1a237e",
          borderRadius: 2,
          p: 4,
          color: "white",
          mb: 4,
          display: "flex",
          alignItems: "center",
          gap: 3,
        }}

        
      >
        <Box sx={{ position: "relative" }}>
          <Avatar
            src={avatar}
            sx={{
              width: 100,
              height: 100,
              bgcolor: "#3949ab",
              fontSize: "2rem",
              fontWeight: "bold",
            }}
          >
            T
          </Avatar>
          <Button
            component="label"
            sx={{
              position: "absolute",
              bottom: 0,
              right: 0,
              bgcolor: "rgba(0,0,0,0.5)",
              color: "white",
              minWidth: 0,
              padding: 0.5,
              borderRadius: "50%",
              ":hover": { bgcolor: "rgba(0,0,0,0.7)" },
            }}
          >
            <PhotoCameraIcon fontSize="small" />
            <input type="file" accept="image/*" hidden onChange={handleAvatarChange} />
          </Button>
        </Box>
        <Box>
          <Typography variant="h6" fontWeight="bold" sx={{ fontSize: "1.2rem" }}>
          {employee?.first_name} {employee?.last_name}
          </Typography>
          <Typography sx={{ fontSize: "0.9rem" }}>{employee?.personal_id}</Typography>
        </Box>
      </Box>

      {/* Tabs */}
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        textColor="primary"
        indicatorColor="primary"
        sx={{
          backgroundColor: "white",
          borderRadius: 2,
          mb: 4,
          "& .MuiTabs-flexContainer": { justifyContent: "space-between" },
          "& .MuiTab-root": { textTransform: "capitalize", fontSize: "0.95rem", fontWeight: "bold" },
        }}
      >
        <Tab label={<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}><PersonIcon />Details</Box>} />
        <Tab label={<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}><ActivityIcon />Activity</Box>} />
        <Tab label={<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}><ScheduleIcon />Schedule</Box>} />
        <Tab label={<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}><HistoryIcon />Working History</Box>} />
        <Tab label={<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}><NotesIcon />Notes</Box>} />
      </Tabs>
      

      {/* Profile Details*/}
      {selectedTab === 0 && (
          <Paper
            elevation={3}
            sx={{
              backgroundColor: "white",
              borderRadius: 3,
              p: 4,
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            }}
          >
            <Typography fontWeight="bold" variant="h6" sx={{ mb: 3, color: "#1a237e" }}>
              Personal Details
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Box display="flex" alignItems="center" gap={2}>
                  <Avatar sx={{ bgcolor: "#e3f2fd", color: "#1e88e5" }}>
                    <PersonIcon />
                  </Avatar>
                  <Box>
                    <Typography fontWeight="bold" color="text.secondary">
                      Name
                    </Typography>
                    <Typography>{employee?.first_name} {employee?.last_name}</Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box display="flex" alignItems="center" gap={2}>
                  <Avatar sx={{ bgcolor: "#fce4ec", color: "#d81b60" }}>
                    <EmailIcon />
                  </Avatar>
                  <Box>
                    <Typography fontWeight="bold" color="text.secondary">
                      Email
                    </Typography>
                    <Typography>{employee?.email}</Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box display="flex" alignItems="center" gap={2}>
                  <Avatar sx={{ bgcolor: "#e8f5e9", color: "#4caf50" }}>
                    <PhoneIcon />
                  </Avatar>
                  <Box>
                    <Typography fontWeight="bold" color="text.secondary">
                      Mobile
                    </Typography>
                    <Typography>{employee?.mobile}</Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box display="flex" alignItems="center" gap={2}>
                  <Avatar sx={{ bgcolor: "#ede7f6", color: "#7e57c2" }}>
                    <GenderIcon />
                  </Avatar>
                  <Box>
                    <Typography fontWeight="bold" color="text.secondary">
                      Gender
                    </Typography>
                    <Typography>Male</Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box display="flex" alignItems="center" gap={2}>
                  <Avatar sx={{ bgcolor: "#ffecb3", color: "#ffb300" }}>
                    <BadgeIcon />
                  </Avatar>
                  <Box>
                    <Typography fontWeight="bold" color="text.secondary">
                      Personal ID
                    </Typography>
                    <Typography>{employee?.personal_id}</Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box display="flex" alignItems="center" gap={2}>
                  <Avatar sx={{ bgcolor: "#c8e6c9", color: "#43a047" }}>
                    <WorkIcon />
                  </Avatar>
                  <Box>
                    <Typography fontWeight="bold" color="text.secondary">
                      Job Role
                    </Typography>
                    <Typography>{employee?.job_role || "Not Assigned"}</Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box display="flex" alignItems="center" gap={2}>
                  <Avatar sx={{ bgcolor: "#b3e5fc", color: "#0288d1" }}>
                    <LocationIcon />
                  </Avatar>
                  <Box>
                    <Typography fontWeight="bold" color="text.secondary">
                      Location
                    </Typography>
                    <Typography>{employee?.address1}, {employee?.city}</Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box display="flex" alignItems="center" gap={2}>
                  <Avatar sx={{ bgcolor: "#ffccbc", color: "#ff5722" }}>
                    <CheckCircleIcon />
                  </Avatar>
                  <Box>
                    <Typography fontWeight="bold" color="text.secondary">
                      Status
                    </Typography>
                    <Typography>{employee?.status}</Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        )}

        {/* Activity Tab */}
        {selectedTab === 1 && (
  <Paper sx={{ p: 4, borderRadius: 3 }}>
    <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
      Activity
    </Typography>
    <Box mb={3} display="flex" gap={2}>
      <TextField
        label="Filter by Type"
        select
        value={activityFilter}
        onChange={(e) => setActivityFilter(e.target.value)}
        fullWidth
        sx={{ width: 200 }}
      >
        <MenuItem value="All">All</MenuItem>
        <MenuItem value="Accepted Schedule">Accepted Schedule</MenuItem>
        <MenuItem value="Clock In">Clock In</MenuItem>
        <MenuItem value="Clock Out">Clock Out</MenuItem>
      </TextField>
      <TextField
        label="Search by Client"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        fullWidth
      />
    </Box>
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Type</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Client</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredActivities.map((activity, index) => (
            <TableRow key={index}>
              <TableCell>{activity.type}</TableCell>
              <TableCell>{activity.category}</TableCell>
              <TableCell>{activity.date}</TableCell>
              <TableCell>{activity.time}</TableCell>
              <TableCell>{activity.client}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Paper>
)}



              {/* Schedule Tab */}
              {selectedTab === 2 && (
                <Paper sx={{ p: 4 }}>
                  <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                    Weekly Schedule
                  </Typography>
                  {weeklySchedule.map((day, index) => (
                    <Paper key={index} sx={{ p: 3, mb: 2, backgroundColor: "#f5f5f5", borderRadius: 3 }}>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {day.day}
                      </Typography>
                      {day.tasks.length > 0 ? (
                        day.tasks.map((task, i) => (
                          <Box key={i} sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
                            <Typography>{task.description}</Typography>
                            <Chip label={task.status} color={task.status === "Completed" ? "success" : "warning"} />
                          </Box>
                        ))
                      ) : (
                        <Typography variant="body2" sx={{ fontStyle: "italic", mt: 1 }}>
                          No tasks assigned.
                        </Typography>
                      )}
                    </Paper>
                  ))}
                </Paper>
              )}

        {/* Working History*/}
        {selectedTab === 3 && (
          <Paper
            sx={{
              p: 4,
              borderRadius: 3,
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              backgroundColor: "#ffffff",
            }}
          >
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{ mb: 3, color: "#1a237e" }}
            >
              Working History
            </Typography>

            {/* Filters */}
            <Box
              sx={{
                display: "flex",
                gap: 2,
                mb: 3,
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <TextField
                label="From"
                type="date"
                InputLabelProps={{ shrink: true }}
                sx={{ minWidth: 200 }}
              />
              <TextField
                label="To"
                type="date"
                InputLabelProps={{ shrink: true }}
                sx={{ minWidth: 200 }}
              />
              <TextField
                label="Search Client..."
                variant="outlined"
                sx={{ flexGrow: 1 }}
              />
               {/* Clear Button */}
                  <Button variant="text" color="error" startIcon={<DeleteIcon />} onClick={() => setSearchQuery("")}>
                       Clear
                    </Button>
                  </Box>

            {/* Working History Table */}
            <TableContainer>
              <Table>
                <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Clock In Time</TableCell>
                    <TableCell>Clock Out Time</TableCell>
                    <TableCell>Service Provided</TableCell>
                    <TableCell>Client</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {workingHistory.length > 0 ? (
                    workingHistory.map((entry, index) => (
                      <TableRow key={index}>
                        <TableCell>{entry.date}</TableCell>
                        <TableCell>{entry.clockInTime}</TableCell>
                        <TableCell>{entry.clockOutTime}</TableCell>
                        <TableCell>{entry.service}</TableCell>
                        <TableCell>{entry.client}</TableCell>
                        <TableCell>
                          <Chip
                            label={entry.status}
                            color={
                              entry.status === "Completed"
                                ? "success"
                                : entry.status === "Pending"
                                ? "warning"
                                : "default"
                            }
                          />
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} align="center">
                        No working history available.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Pagination */}
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: "bold", color: "#5F6368" }}>
                Rows per page:
              </Typography>
              <Select
                value={rowsPerPage}
                onChange={(e) => {
                  setRowsPerPage(Number(e.target.value));
                  setCurrentPage(0);
                }}
                sx={{
                  height: 32,
                  border: "1px solid #E0E0E0",
                  borderRadius: "8px",
                  "& .MuiSelect-select": {
                    padding: "4px 16px",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                }}
              >
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={25}>25</MenuItem>
              </Select>
            </Box>

        <Typography variant="body2" sx={{ fontWeight: "bold", color: "#5F6368" }}>
          {currentPage * rowsPerPage + 1}–{Math.min((currentPage + 1) * rowsPerPage, filteredHistory.length)} of{" "}
          {filteredHistory.length}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Button
            onClick={() => handlePageChange("prev")}
            disabled={currentPage === 0}
            sx={{
              minWidth: 40,
              height: 32,
              border: "1px solid #E0E0E0",
              color: currentPage === 0 ? "#BDBDBD" : "#5F6368",
              borderRadius: "8px",
              backgroundColor: "#F8F9FA",
              ":hover": { backgroundColor: "#E8E8E8" },
            }}
          >
            Previous
          </Button>
          <Button
            onClick={() => handlePageChange("next")}
            disabled={(currentPage + 1) * rowsPerPage >= filteredHistory.length}
            sx={{
              minWidth: 40,
              height: 32,
              border: "1px solid #E0E0E0",
              color:
                (currentPage + 1) * rowsPerPage >= filteredHistory.length ? "#BDBDBD" : "#5F6368",
              borderRadius: "8px",
              backgroundColor: "#F8F9FA",
              ":hover": { backgroundColor: "#E8E8E8" },
            }}
          >
            Next
          </Button>
        </Box>
      </Box>
   </Paper>
 )}

        {/* Notes */}
        {selectedTab === 4 && (
          <Paper
            sx={{
              p: 4,
              borderRadius: 3,
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              backgroundColor: "#ffffff",
            }}
          >
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{ mb: 3, color: "#1a237e" }}
            >
              Notes
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                backgroundColor: "#f9f9f9",
                borderRadius: 2,
                p: 3,
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              <TextField
                label="Write your notes"
                multiline
                rows={4}
                variant="outlined"
                sx={{
                  width: "100%",
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#ffffff",
                    borderRadius: "8px",
                  },
                }}
              />
              <Button
                variant="contained"
                sx={{
                  alignSelf: "flex-end",
                  backgroundColor: "#1a237e",
                  color: "#ffffff",
                  textTransform: "none",
                  fontWeight: "bold",
                  ":hover": {
                    backgroundColor: "#3949ab",
                  },
                }}
              >
                Post
              </Button>
            </Box>
          </Paper>
        )}
    </Box>
  );
};
export default EmployeeProfile;