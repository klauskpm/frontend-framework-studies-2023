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
            <h1 className="text-5xl font-bold">Hello there</h1>
            <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
            <button className="btn btn-primary">Get Started</button>
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
