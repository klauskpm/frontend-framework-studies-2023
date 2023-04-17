import { useEffect, useState } from "react";
import { LoginPage } from "@shared/simple";
import { registerUser } from "./auth";
import { Country, getCountries } from "./countries";
import { supabase } from "./supabaseClient";
import Account from "./Account";


function App() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    getCountries().then(({ data }) => {
      if (!data) return;
      setCountries(data);
    });
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("getSession", session)
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      console.log("onAuthStateChange", session)
      setSession(session)
    })
  }, [])

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
      {!session ? <LoginPage onSubmit={onSubmit} /> : <Account session={session} />}
      <ul>
        {countries.map((country) => (
          <li key={country.name}>{country.name}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
