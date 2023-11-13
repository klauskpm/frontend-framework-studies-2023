import { supabase } from "../../supabase/supabaseClient";
import { redirect } from "react-router-dom";

export const loginLoader = async () => {
  const session = await supabase.auth.getSession().then(({ data }) => {
    return data?.session;
  });

  if (!session?.user) {
    return null;
  }

  return redirect("/");
};

export const profileLoader = async () => {
  const session = await supabase.auth.getSession().then(({ data }) => {
    return data?.session;
  });
  const hasUser = !!session?.user;

  if (hasUser) {
    return null;
  }

  return redirect("/login");
};
