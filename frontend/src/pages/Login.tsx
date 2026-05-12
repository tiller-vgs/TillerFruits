import { authClient } from "../utils/auth-client";
import LoginCard from "../components/LoginCard";
function Login() {
  const handleSignIn = async () => {
    await authClient.signIn.social({
      provider: "github",
      callbackURL: "http://localhost:5173/",
    });
  };

  return (
    <div className="min-h-[calc(100dvh-65px)] justify-center py-35 flex bg-var(--color-bright-snow) px-2">
      <LoginCard handleSignIn={handleSignIn} />
    </div>
  );
}

export default Login;
