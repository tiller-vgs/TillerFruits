import { useEffect, useState } from "react";
import FileCard from "./FileCard";
import {
  Box,
  Typography,
  Grid,
  CircularProgress,
  Alert,
  Divider,
} from "@mui/material";

interface FileItem {
  id: string;
  extension: string;
  originalName: string;
  displayName: string;
}

function FileList() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchFiles();
  }, []);

  async function fetchFiles() {
    try {
      const response = await fetch("http://localhost:5000/api/v1/files");
      const data = await response.json();
      setFiles(data.data);
      setLoading(false);
    } catch (error) {
      setError("Noe gikk galt, prøv igjen senere");
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" py={6}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Box>
      <Typography variant="h6" fontWeight="medium" gutterBottom>
        Filer å sende videre ({files.length})
      </Typography>
      <Grid container spacing={3} mb={5}>
        {files.map((file) => (
          <Grid key={file.id}>
            <FileCard file={file} />
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ mb: 3 }} />

      <Typography variant="h6" fontWeight="medium" color="text.secondary">
        Oppgavehistorikk
      </Typography>
    </Box>
  );
}

export default FileList;
