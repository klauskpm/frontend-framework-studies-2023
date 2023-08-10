import * as Toast from "@radix-ui/react-toast";

interface ToastSuccessProps {
  open: boolean;
  onClose?: () => void;
  message: string;
  duration?: number;
}

export default function ToastSuccess({
  open,
  onClose = () => null,
  message,
  duration = 5000,
  ...props
}: ToastSuccessProps) {
  return (
    <Toast.Root
      open={open}
      onOpenChange={() => onClose()}
      duration={duration}
      {...props}
    >
      <div className="alert alert-success">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 flex-shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <div>
          <Toast.Title asChild>
            <span>{message}</span>
          </Toast.Title>
        </div>
        <Toast.Close asChild>
          <button className="btn btn-ghost">Dismiss</button>
        </Toast.Close>
      </div>
    </Toast.Root>
  );
}
