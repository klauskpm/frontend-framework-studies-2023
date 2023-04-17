import { useEffect, useState } from "react";
import { LoginPage } from "@shared/simple";
import { registerUser } from "./auth";
import { Country, getCountries } from "./countries";
import { useSession } from "./useSession";
import Account from "./Account";


function App() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [session] = useSession();

  useEffect(() => {
    getCountries().then(({ data }) => {
      if (!data) return;
      setCountries(data);
    });
  }, []);

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
