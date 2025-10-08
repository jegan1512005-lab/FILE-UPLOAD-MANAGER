import React, { useState } from "react";
import FileUpload from "./components/FileUpload";
import FileList from "./components/Filelist";
import { Container, Typography, Box } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css';

function App() {
  const [refresh, setRefresh] = useState(false);

  return (
   <Container className="container">
  <Typography variant="h4" gutterBottom>File Upload Manager</Typography>
  <FileUpload onUploadSuccess={() => setRefresh(!refresh)} />
  <Box sx={{ mt: 3 }}>
    <FileList key={refresh} />
  </Box>
  <ToastContainer />
</Container>

  );
}

export default App;
