export interface LoginPageProps {
  onSubmit: (formData: any, event: any) => void;
  sent: boolean;
  error?: string;
}

const extractFormData = () => {
  const form = document.getElementById("loginForm") as HTMLFormElement;
  if (!form) return {};
  const formData = new FormData(form);
  return Object.fromEntries(formData.entries());
};

export default function LoginPage({ onSubmit, sent, error }: LoginPageProps) {
  const handleSubmit = (event: any) => {
    event.preventDefault();
    onSubmit(extractFormData(), event);
  };

  return (
    <div className="hero min-h-full bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        {sent && (
          <div className="text-center">
            <h1 className="text-5xl font-bold">Check your email!</h1>
            <p className="py-6">
              We've sent you a magic link to login.
            </p>
          </div>
        )}
        {!sent && (
          <>
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold">Login now!</h1>
              <p className="py-6">
                Type your email address and we'll send you a magic link.
              </p>
            </div>
            <div className="card w-full max-w-sm flex-shrink-0 bg-base-100 shadow-2xl">
              <div className="card-body">
                <form id="loginForm" onSubmit={handleSubmit}>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <input
                        name="email"
                        type="text"
                        placeholder="email"
                        className="input-bordered input data-[error=true]:input-error"
                        data-error={!!error}
                    />
                    {error && (
                      <label className="label">
                        <span className="label-text-alt text-error">{error}</span>
                      </label>
                    )}
                  </div>
                  <div className="form-control mt-6">
                    <button className="btn-primary btn">Login with magic link</button>
                  </div>
                </form>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
