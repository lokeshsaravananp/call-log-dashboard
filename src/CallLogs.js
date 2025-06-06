import { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
} from "@mui/material";

const CallLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLogs = (url) => {
    setLoading(true);
    axios
      .get(url)
      .then((response) => {
        console.log("Fetched logs:", response.data);
        setLogs(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching logs:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchLogs("https://calllog-backend-1.onrender.com/api/logs/all");
  }, []);

  const handleTodayClick = () => {
    fetchLogs("https://calllog-backend-1.onrender.com/api/logs/today");
  };

  const handleBackClick = () => {
    fetchLogs("https://calllog-backend-1.onrender.com/api/logs/all");
  };

  if (loading) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ marginTop: 2 }}>
          Loading call logs...
        </Typography>
      </div>
    );
  }

  if (logs.length === 0) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <Typography variant="h6">No call logs available.</Typography>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem" }}>
      <div style={{ marginBottom: "1rem", display: "flex", justifyContent: "space-between" }}>
        <Button variant="outlined" color="secondary" onClick={handleBackClick}>
          Back
        </Button>
        <Button variant="contained" color="primary" onClick={handleTodayClick}>
          Today
        </Button>
      </div>
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#1976d2" }}>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Phone Number</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Call Type</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Call Time</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Duration</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {logs.map((log, index) => (
              <TableRow
                key={index}
                sx={{
                  "&:hover": { backgroundColor: "#f5f5f5" },
                }}
              >
                <TableCell>{log.phoneNumber}</TableCell>
                <TableCell>{log.callType}</TableCell>
                <TableCell>
                  {new Date(new Date(log.callTime).getTime() + 5.5 * 60 * 60 * 1000).toLocaleString()}
                </TableCell>
                <TableCell>{(log.duration / 60).toFixed(2)} min</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CallLogs;
