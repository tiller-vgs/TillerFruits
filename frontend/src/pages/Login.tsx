import { authClient } from "../utils/auth-client";
import LoginCard from "../components/LoginCard";
import FormHelperText from "@mui/material/FormHelperText";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import type { UploadStatus } from "../../types/types";

function Login() {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loadingStatus, setLoadingStatus] = useState<UploadStatus>("idle");

  const handleSignIn = async () => {
    setErrorMessage("");
    setLoadingStatus("loading");

    try {
      await authClient.signIn.social({
        provider: "github",
        callbackURL: "http://localhost:5173/",
      });

      setLoadingStatus("success");
    } catch (error: any) {
      setLoadingStatus("error");

      error.message === "Failed to fetch"
        ? setErrorMessage(
            "Det oppsto en feil i systemet.\nPrøv igjen eller ta kontakt med support.",
          )
        : setErrorMessage("Uventet feil: " + error.message);
    }
  };

  return (
    <div className="min-h-[calc(100dvh-65px)] items-center gap-5 py-35 flex flex-col bg-var(--color-bright-snow) px-2">
      <LoginCard handleSignIn={handleSignIn} />

      {loadingStatus === "loading" && <CircularProgress size={32} />}

      {loadingStatus === "success" && (
        <FormHelperText>Logget inn!</FormHelperText>
      )}

      {errorMessage && (
        <FormHelperText
          error={!!errorMessage}
          sx={{
            fontSize: "1rem",
            whiteSpace: "pre-line",
            textAlign: "center",
            padding: "0",
          }}
        >
          {errorMessage}
        </FormHelperText>
      )}
    </div>
  );
}

export default Login;
