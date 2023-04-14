export interface LoginPageProps {
  onSubmit: (formData: any, event: any) => void;
}

const extractFormData = () => {
  const form = document.getElementById("loginForm") as HTMLFormElement;
  if (!form) return {};
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  return data;
};

export default function LoginPage({ onSubmit }: LoginPageProps) {
  const handleSubmit = (event: any) => {
    event.preventDefault();
    onSubmit(extractFormData(), event);
  };

  return (
    <div className="flex min-h-full items-center justify-center px-4 py-20 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-2 rounded bg-base-100 p-6 shadow-md">
        <div className="prose">
          <h2 className="text-center">Sign in to your account</h2>
        </div>
        <form
          className="mx-12 mt-8 flex flex-col items-center space-y-4"
          name="loginForm"
          id="loginForm"
          onSubmit={handleSubmit}
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
            className="bg-content input-bordered input w-full max-w-xs"
            placeholder="Email address"
          />

          <div className="flex w-full flex-row justify-between pt-4">
            <button
              type="submit"
              className="btn-primary btn"
            >
              Email login link
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
