import * as Toast from "@radix-ui/react-toast";

interface ToastAlertProps {
    open: boolean;
    onClose?: Function;
    errorMessage: string;
    duration?: number;
}

export default function ToastAlert({
   open,
   onClose = () => {},
   errorMessage,
   duration = 5000,
   ...props
   }: ToastAlertProps) {
    return (
        <Toast.Root
            open={open}
            onOpenChange={() => onClose()}
            duration={duration}
            {...props}
        >
            <div className="alert alert-error">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none"
                         viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <div>
                        <Toast.Title asChild>
                            <h3 className="font-bold">Error!</h3>
                        </Toast.Title>
                        <Toast.Description asChild>
                            <div className="text-xs">{errorMessage}</div>
                        </Toast.Description>
                    </div>
                </div>
                <Toast.Close asChild>
                    <button className="btn btn-ghost">Dismiss</button>
                </Toast.Close>
            </div>
        </Toast.Root>
    )
}