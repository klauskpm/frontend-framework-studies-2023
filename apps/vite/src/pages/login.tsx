import {useState} from "react";
import { redirect, useNavigate } from "react-router-dom";
import { LoginPage } from "@shared/simple";

import { magicLoginUser } from "../auth";
import { supabase } from "../features/supabase/supabaseClient";
import { useSession } from "../SessionProvider";

function Login() {
  const [session] = useSession();
  const navigate = useNavigate();
  const [sent, setSent] = useState(true);

  async function onSubmit(formData: any) {
    await magicLoginUser(formData.email);
    setSent(true);
  }

  if (!!session?.user) {
    navigate("/");
    return null;
  }

  return (
    <LoginPage onSubmit={onSubmit} sent={sent} />
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
