import { LoginPage } from "@shared/simple";

import { magicLoginUser } from "../auth";

function Login() {
  function onSubmit(formData: any) {
    magicLoginUser(formData.email);
  }

  return (
    <LoginPage onSubmit={onSubmit} />
  );
}

export default Login;
