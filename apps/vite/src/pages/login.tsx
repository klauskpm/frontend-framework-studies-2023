import { LoginPage } from "@shared/simple";

import { magicLoginUser } from "../auth";
import CommonPage from "../CommonPage";

function Login() {
  function onSubmit(formData: any) {
    magicLoginUser(formData.email);
  }

  return (
    <CommonPage>
      <LoginPage onSubmit={onSubmit} />
    </CommonPage>
  );
}

export default Login;
