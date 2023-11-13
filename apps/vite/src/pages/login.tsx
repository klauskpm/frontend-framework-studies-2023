import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { LoginPage } from "@shared/react-ui";

import { magicLoginUser } from "../auth";
import { ToastError } from "@shared/react-ui";
import { useSession } from "../features/supabase/useSession";

function Login() {
  const { session } = useSession();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string>("");

  async function onSubmit(formData: any) {
    setError("");
    setLoading(true);

    await magicLoginUser(formData.email).then((response) => {
      setLoading(false);
      if (response?.error) {
        setError(response.error.message);
        return;
      }
      setSent(true);
    });
  }
  const hasUser = !!session?.user;

  if (hasUser) {
    navigate("/");
    return null;
  }

  return (
    <>
      <LoginPage onSubmit={onSubmit} sent={sent} loading={loading} />
      <ToastError open={!!error} message={error} onClose={() => setError("")} />
    </>
  );
}

export default Login;
