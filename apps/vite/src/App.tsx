import { useEffect, useState } from "react";
import { LoginPage } from "@shared/simple";
import { createClient } from "@supabase/supabase-js";
import { Database } from "../supabase";

const getURL = () => {
  let url = import.meta.env.VITE_VERCEL_URL ?? "http://localhost:5173";
  // Make sure to include `https://` when not localhost.
  url = url.includes('http') ? url : `https://${url}`;
  // Make sure to including trailing `/`.
  url = url.charAt(url.length - 1) === '/' ? url : `${url}/`;
  return url;
};

function createSupabaseClient(key: string) {
  return createClient<Database>("https://eikzucowzxcedzyckglx.supabase.co", key);
}

const supabase = createSupabaseClient(import.meta.env.VITE_SUPABASE_ANON_KEY);

type Country = Database["public"]["Tables"]["countries"]["Row"];

async function registerUser(email: string) {
  const redirectUrl = getURL();
  console.log(redirectUrl);
  return supabase.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: redirectUrl }
  });
}

async function getUser() {
  return supabase.auth.getUser();
}

function App() {
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    getCountries();
  }, []);

  useEffect(() => {
    getUser().then((response) => {
      console.log(response);
    });
  }, []);

  async function getCountries() {
    const { data } = await supabase.from("countries").select();
    if (!data) return;
    setCountries(data);
  }

  function onSubmit(formData: any) {
    console.log("onSubmit", formData);
    registerUser(formData.email)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <LoginPage onSubmit={onSubmit} />
      <ul>
        {countries.map((country) => (
          <li key={country.name}>{country.name}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
