import { useEffect, useState } from "react";
import { LoginPage } from "@shared/simple";
import { magicLoginUser } from "./auth";
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
    magicLoginUser(formData.email);
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
