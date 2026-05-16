import { Card, CardContent, Typography, Chip, Box } from "@mui/material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import type { FileItem } from "../../types/types";

function FileCard({ file }: { file: FileItem }) {
  const ext = file.extension.replace(".", "").toUpperCase();

  return (
    <Card
      variant="outlined"
      sx={{
        width: 280,
        transition: "box-shadow 0.2s",
        "&:hover": { boxShadow: 4 },
      }}
    >
      <CardContent>
        <Box display="flex" alignItems="center" gap={1.5} mb={2}>
          <InsertDriveFileIcon color="primary" fontSize="large" />
          <Chip label={ext} size="small" color="primary" variant="outlined" />
        </Box>
        <Typography
          variant="body1"
          fontWeight="medium"
          noWrap
          title={file.originalName}
        >
          {file.originalName}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          sendt av {file.displayName}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default FileCard;
