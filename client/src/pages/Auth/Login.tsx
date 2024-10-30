import LoginForm from "@/components/Auth/LoginForm.tsx";

export default function Login() {
    return (
        <>
            <div className="flex-1 flex items-center justify-center p-4">
                <div className="w-full">
                    <LoginForm/>
                </div>
            </div>
        </>
    )
}