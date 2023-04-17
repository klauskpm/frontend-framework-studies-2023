import { LoginPage } from "@shared/simple";
import { magicLoginUser } from "./auth";
import { useSession } from "./useSession";
import Account from "./Account";
import Countries from "./Countries";


function App() {
  
  const [session] = useSession();

  

  function onSubmit(formData: any) {
    magicLoginUser(formData.email);
  }

  return (
    <>
      {!session ? <LoginPage onSubmit={onSubmit} /> : <Account session={session} />}
      <Countries />
    </>
  );
}

export default App;

