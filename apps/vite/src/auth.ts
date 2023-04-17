import { supabase } from "./supabaseClient";

const isValidURL = () => {
  const regex = /^https:\/\/ffs2023.*(-klauskpm){0,1}\.vercel\.app$/;
  const url = location.origin;
  return regex.test(url);
};

const getURL = () => {
  let url = "http://localhost:5173";
  if (!import.meta.env.DEV && isValidURL()) {
    url = location.origin;
  }
  // Make sure to include `https://` when not localhost.
  url = url.includes("http") ? url : `https://${url}`;
  // Make sure to including trailing `/`.
  url = url.charAt(url.length - 1) === "/" ? url : `${url}/`;
  return url;
};

console.log('env', import.meta.env);
console.log('URL', getURL());

export async function magicLoginUser(email: string) {
  const redirectUrl = getURL();
  console.log(redirectUrl);
  return supabase.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: redirectUrl },
  });
}

export async function logoutUser() {
  return supabase.auth.signOut();
}

export async function getUser() {
  return supabase.auth.getUser();
}
