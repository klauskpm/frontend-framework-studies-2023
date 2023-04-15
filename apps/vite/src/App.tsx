import { useEffect, useState } from "react";
import { LoginPage } from "@shared/simple";
import { getUser, registerUser } from "./auth";
import { Country, getCountries } from "./countries";

function App() {
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    getCountries().then(({ data }) => {
      if (!data) return;
      setCountries(data);
    });
  }, []);

  useEffect(() => {
    getUser().then((response) => {
      console.log(response);
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
