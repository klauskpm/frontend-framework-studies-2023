import { useState } from "react";
import { redirect, useNavigate } from "react-router-dom";

import { LoginPage } from "@shared/react-ui";

import { magicLoginUser } from "../auth";
import { supabase } from "../features/supabase/supabaseClient";
import { useOldSession } from "../features/supabase/useOldSession";
import { ToastError } from "@shared/react-ui";

function Login() {
  const [session] = useOldSession();
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
      <ToastError
        open={!!error}
        errorMessage={error}
        onClose={() => setError("")}
      />
    </>
  );
}

export const loginLoader = async () => {
  const session = await supabase.auth.getSession().then(({ data }) => {
    return data?.session;
  });

  if (!session?.user) {
    return null;
  }

  return redirect("/");
};

export default Login;
