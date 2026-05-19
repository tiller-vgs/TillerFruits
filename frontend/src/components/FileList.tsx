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
import type { FileItem } from "../types/types";

function FileList() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchFiles();
  }, []);

  async function fetchFiles() {
    try {
      const response = await fetch("http://localhost:5000/api/v1/admin/files", {
        credentials: "include",
      });
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

  const newFiles = files.filter((f) => f.status === "new");
  const sentFiles = files.filter((f) => f.status === "sent");

  return (
    <Box display="flex" gap={3} alignItems="flex-start">
      <Box flex={1}>
        <Typography variant="h6" fontWeight="medium" gutterBottom>
          Filer å sende videre ({newFiles.length})
        </Typography>
        <Grid container spacing={2}>
          {newFiles.map((file) => (
            <Grid key={file.id}>
              <FileCard file={file} />
            </Grid>
          ))}
          {newFiles.length === 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ pl: 1 }}>
              Ingen nye filer
            </Typography>
          )}
        </Grid>
      </Box>

      <Divider orientation="vertical" flexItem />

      <Box flex={1}>
        <Typography variant="h6" fontWeight="medium" color="text.secondary" gutterBottom>
          Oppgavehistorikk ({sentFiles.length})
        </Typography>
        <Grid container spacing={2}>
          {sentFiles.map((file) => (
            <Grid key={file.id}>
              <FileCard file={file} />
            </Grid>
          ))}
          {sentFiles.length === 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ pl: 1 }}>
              Ingen sendte filer ennå
            </Typography>
          )}
        </Grid>
      </Box>
    </Box>
  );
}

export default FileList;
