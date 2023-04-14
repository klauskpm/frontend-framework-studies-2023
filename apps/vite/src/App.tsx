import { useEffect, useState } from "react";
import { LoginPage } from "@shared/simple";
import { createClient } from "@supabase/supabase-js";
import { Database } from "../supabase";

const supabase = createClient<Database>(
  "https://eikzucowzxcedzyckglx.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVpa3p1Y293enhjZWR6eWNrZ2x4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODExNjkxMzEsImV4cCI6MTk5Njc0NTEzMX0.8ZXPBCpPYL7TCcHJ7LNWbRPkH9QNtFhDDl9Azx-oJEU"
);

type Country = Database["public"]["Tables"]["countries"]["Row"];

async function registerUser(email: string) {
  return supabase.auth.signInWithOtp({ email });
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

  function onSignUp(formData: any) {
    console.log("onSignUp", formData);
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
      <LoginPage onSignIn={() => {}} onSignUp={onSignUp} />
      <ul>
        {countries.map((country) => (
          <li key={country.name}>{country.name}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
