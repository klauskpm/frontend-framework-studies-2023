import {useState} from "react";
import { redirect, useNavigate } from "react-router-dom";
import { LoginPage } from "@shared/simple";

import { magicLoginUser } from "../auth";
import { supabase } from "../features/supabase/supabaseClient";
import { useSession } from "../SessionProvider";

function Login() {
  const [session] = useSession();
  const navigate = useNavigate();
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string>();

  async function onSubmit(formData: any) {
    setSent(true);
    await magicLoginUser(formData.email)
        .then((response) => {
          if (response?.error) {
            setSent(false);
            setError(response.error.message);
          }
        });
  }

  if (!!session?.user) {
    navigate("/");
    return null;
  }

  return (
    <LoginPage onSubmit={onSubmit} sent={sent} error={error} />
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
