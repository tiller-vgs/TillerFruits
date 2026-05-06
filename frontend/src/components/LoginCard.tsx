import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import GitHubIcon from "@mui/icons-material/GitHub";

export default function LoginCard({
  handleSignIn,
}: {
  handleSignIn: () => void;
}) {
  return (
    <Card
      sx={{
        minWidth: 390,
        maxWidth: 470,
        maxHeight: 320,
        borderRadius: 3,
        overflow: "hidden",
        boxShadow: "0 4px 24px rgba(31, 19, 0, 0.10)",
        bgcolor: "#FFFFFF",
      }}
    >
      {/* Gradient accent bar */}
      <Box
        sx={{
          height: 5,
          background:
            "linear-gradient(90deg, var(--color-sage-green) 0%, var(--color-bright-lemon) 100%)",
        }}
      />

      <CardContent sx={{ p: 4, pt: 3.5 }}>
        {/* Brand badge */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 3.5,
          }}
        >
          <Box
            sx={{
              width: 60,
              height: 60,
              borderRadius: "50%",
              bgcolor: "var(--color-sage-green)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 2,
              boxShadow: "0 4px 12px rgba(103, 148, 54, 0.30)",
            }}
          >
            <Typography sx={{ fontSize: "1.6rem", lineHeight: 1 }}>
              🌿
            </Typography>
          </Box>
          <Typography
            variant="h5"
            component="div"
            sx={{
              fontWeight: 800,
              color: "var(--color-coffee-bean)",
              letterSpacing: "-0.5px",
              fontSize: "1.8rem",
            }}
          >
            TillerFruits
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "var(--color-dusty-lavender)", mt: 0.5, fontSize: "1rem" 
            }}
          >
            Sign in to your account
          </Typography>
        </Box>
        <Box sx={{ height: "1px", bgcolor: "#EBEBEB", mb: 3 }} />
        <Button
          variant="contained"
          startIcon={<GitHubIcon />}
          sx={{
            width: "100%",
            py: 1.75,
            fontSize: "1rem",
            fontWeight: 600,
            textTransform: "none",
            borderRadius: 2,
            bgcolor: "var(--color-coffee-bean)",
            color: "var(--color-bright-snow)",
            boxShadow: "none",
            "&:hover": {
              bgcolor: "var(--color-sage-green)",
              boxShadow: "0 4px 16px rgba(103, 148, 54, 0.35)",
            },
            transition: "background-color 0.2s ease, box-shadow 0.2s ease",
          }}
          onClick={() => {
            handleSignIn();
          }}
        >
          Continue with GitHub
        </Button>
      </CardContent>
    </Card>
  );
}
