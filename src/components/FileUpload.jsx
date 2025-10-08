import React, { useState } from "react";
import { Button, LinearProgress, Box } from "@mui/material";
import { uploadFile } from "../api";
import { toast } from "react-toastify";

const FileUpload = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!file) return toast.error("Please select a file!");
    try {
      await uploadFile(file, {
        onUploadProgress: (e) => setProgress(Math.round((e.loaded / e.total) * 100)),
      });
      toast.success("File uploaded successfully!");
      setFile(null);
      setProgress(0);
      onUploadSuccess();
    } catch (err) {
      toast.error("Upload failed!");
      console.error(err);
    }
  };

  return (
    <Box sx={{ mb: 3 }}>
      <input type="file" onChange={handleChange} />
      <Button variant="contained" onClick={handleUpload} sx={{ ml: 2 }}>
        Upload
      </Button>
      {progress > 0 && <LinearProgress variant="determinate" value={progress} sx={{ mt: 1 }} />}
    </Box>
  );
};

export default FileUpload;
