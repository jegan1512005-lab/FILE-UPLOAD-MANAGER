import React, { useEffect, useState } from "react";
import { getFiles, deleteFile } from "../api";
import { List, ListItem, ListItemText, IconButton, Link } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";

const FileList = () => {
  const [files, setFiles] = useState([]);

  const fetchFiles = async () => {
    try {
      const { data } = await getFiles();
      setFiles(data);
    } catch (err) {
      toast.error("Failed to fetch files");
      console.error(err);
    }
  };

  const handleDelete = async (filename) => {
    try {
      await deleteFile(filename);
      toast.success("File deleted!");
      fetchFiles();
    } catch (err) {
      toast.error("Failed to delete file");
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <List>
      {files.map((file) => (
        <ListItem
          key={file.filename}
          secondaryAction={
            <IconButton edge="end" onClick={() => handleDelete(file.filename)}>
              <DeleteIcon />
            </IconButton>
          }
        >
          {/* Make the file name clickable */}
          <Link
            href={`http://localhost:5000/uploads/${file.filename}`}
            target="_blank"
            rel="noopener"
            underline="hover"
          >
            {file.filename}
          </Link>
        </ListItem>
      ))}
    </List>
  );
};

export default FileList;
