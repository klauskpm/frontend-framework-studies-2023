import { redirect } from "react-router-dom";
import { LoginPage } from "@shared/simple";

import { magicLoginUser } from "../auth";
import { supabase } from "../supabaseClient";

function Login() {
  function onSubmit(formData: any) {
    magicLoginUser(formData.email);
  }

  return (
    <LoginPage onSubmit={onSubmit} />
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
