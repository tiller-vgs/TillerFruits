import FileList from "../components/FileList";
import { Box, Typography, Divider, Container } from "@mui/material";

function AdminPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Admin Dashboard
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        Administrer innleverte filer og oppgaver
      </Typography>
      <Divider sx={{ mb: 4 }} />
      <FileList />
    </Container>
  );
}

export default AdminPage;
