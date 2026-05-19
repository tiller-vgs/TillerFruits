import FileList from "../components/FileList";
import { Box, Typography, Divider, Container } from "@mui/material";
import { Navigate } from "react-router-dom";
import { authClient } from "../utils/auth-client";
import type { Session } from "../utils/auth-client";

const ADMIN_ROLES = ["teacher", "admin"];

function AdminPage() {
  const { data: session, isPending } = authClient.useSession() as {
    data: Session | null;
    isPending: boolean;
  };

  if (isPending) return null;

  if (!session?.user || !ADMIN_ROLES.includes(session.user.role as string)) {
    return <Navigate to="/" replace />;
  }
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
