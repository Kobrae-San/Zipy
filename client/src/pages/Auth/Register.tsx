import RegisterForm from "@/components/Auth/RegisterForm.tsx";

export function Register() {
    return (
        <>
            <div className="flex-1 flex items-center justify-center p-4">
                <div className="w-full">
                    <RegisterForm/>
                </div>
            </div>
        </>
    )
}