// import { LoginPage } from "@shared/simple";
import { magicLoginUser } from "../auth";
// import { useSession } from "../useSession";
// import Account from "../Account";
// import Countries from "../Countries";
import CommonPage from "../CommonPage";
import { useSession } from "../SessionProvider";

function Home() {  
  const [session] = useSession();

  function onSubmit(formData: any) {
    magicLoginUser(formData.email);
  }

  return (
    <CommonPage>
      <div className="hero h-full bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Welcome \o/</h1>
            <p className="py-6">Hiiii! Enjoy your stay</p>
          </div>
        </div>
      </div>
    </CommonPage>
    // <>
    //   {!session ? <LoginPage onSubmit={onSubmit} /> : <Account session={session} />}
    //   <Countries />
    // </>
  );
}

export default Home;
