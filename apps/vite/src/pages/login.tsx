import {useState} from "react";
import {redirect, useNavigate} from "react-router-dom";
import * as Toast from "@radix-ui/react-toast";

import {LoginPage} from "@shared/simple";

import {magicLoginUser} from "../auth";
import {supabase} from "../features/supabase/supabaseClient";
import {useSession} from "../SessionProvider";

function Login() {
  const [session] = useSession();
  const navigate = useNavigate();
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string>("");

  async function onSubmit(formData: any) {
    setSent(true);
    await magicLoginUser(formData.email)
        .then((response) => {
          if (response?.error) {
            setSent(false);
            setError(response.error.message);
          }
        });
  }

  if (!!session?.user) {
    navigate("/");
    return null;
  }

  return (
    <Toast.Provider swipeDirection="right" duration={10000}>
      <LoginPage onSubmit={onSubmit} sent={sent} />
      <Toast.Root
        open={!!error}
        onOpenChange={() => setError("")}
      >
        <div className="alert alert-error">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <div>
              <Toast.Title asChild>
                <h3 className="font-bold">Error!</h3>
              </Toast.Title>
              <Toast.Description asChild>
                <div className="text-xs">{error}</div>
              </Toast.Description>
            </div>
          </div>
          <Toast.Close asChild>
            <button className="btn btn-ghost">Dismiss</button>
          </Toast.Close>
        </div>
      </Toast.Root>
      <Toast.Viewport className="[--viewport-padding:_25px] fixed bottom-0 right-0 flex flex-col p-[var(--viewport-padding)] gap-[10px] w-[390px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none" />
    </Toast.Provider>
  );
}

export const loginLoader = async () => {
  const session = await supabase.auth.getSession().then(({ data }) => {
    return data?.session;
  });

  if (!session?.user) {
    return null;
  }

  return redirect("/");
};

export default Login;
