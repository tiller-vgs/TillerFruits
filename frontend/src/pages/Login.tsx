import Button from "@mui/material/Button";
import { authClient } from "../../utils/auth-client";
function Login() {
  const handleSignIn = async () => {
    await authClient.signIn.social({
      provider: "github",
      callbackURL: "http://localhost:3000/",
    });
  };

  return (
    <Button variant="contained" onClick={handleSignIn}>
      Login fra Github
    </Button>
  );
}

export default Login;
