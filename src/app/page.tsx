import { LoginForm } from "@/components/auth/login-form";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">ERP System</h1>
          <p className="text-gray-500 mt-2">Gestión empresarial integrada</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
