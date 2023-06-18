import * as Toast from "@radix-ui/react-toast";

interface ToastSuccessProps {
    open: boolean;
    onClose?: Function;
    message: string;
    duration?: number;
}

export default function ToastSuccess({
        open,
        onClose = () => {},
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
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none"
                         viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <div>
                        <Toast.Title asChild>
                            <span>{message}</span>
                        </Toast.Title>
                    </div>
                </div>
                <Toast.Close asChild>
                    <button className="btn btn-ghost">Dismiss</button>
                </Toast.Close>
            </div>
        </Toast.Root>
    )
}