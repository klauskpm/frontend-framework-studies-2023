// import { LoginPage } from "@shared/simple";

function App() {
  // return <LoginPage />;
  return (
    <div className="flex min-h-full items-center justify-center px-4 py-20 sm:px-6 lg:px-8">
      <div className="bg-base-100 w-full max-w-md space-y-2 rounded p-6 shadow-md">
        <div className="prose">
          <h2 className="text-center">Sign in to your account</h2>
        </div>
        <form
          className="mx-12 mt-8 flex flex-col items-center space-y-4"
          action="#"
          method="POST"
        >
          <label htmlFor="email-address" className="sr-only">
            Email address
          </label>
          <input
            id="email-address"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="input input-bordered bg-content w-full max-w-xs"
            placeholder="Email address"
          />
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="input input-bordered w-full max-w-xs"
            placeholder="Password"
          />

          <div className="flex w-full flex-row justify-between pt-4">
            <button type="submit" className="btn btn-outline">
              Register
            </button>

            <button type="submit" className="btn btn-primary">
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
