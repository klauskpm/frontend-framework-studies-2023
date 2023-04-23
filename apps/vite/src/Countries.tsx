import { useEffect, useState } from "react";
import { Country, getCountries } from "./countries-data";
import CommonPage from "./CommonPage";

export default function Countries() {
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    getCountries().then(({ data }) => {
      if (!data)
        return;
      setCountries(data);
    });
  }, []);

  return <CommonPage>
    <article className="prose">
      <h1>Countries page</h1>
      <ul>
        {countries.map((country) => (
          <li key={country.name}>{country.name}</li>
        ))}
      </ul>
    </article>
  </CommonPage>;
}
