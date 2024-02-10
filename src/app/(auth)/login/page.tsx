import LoginCard from "@/app/(auth)/login/login-card";

export default async function Login() {
  return (
    <>
      <h1 className="text-2xl font-bold text-center mb-4">
        Log in to SnapNext
      </h1>
      <LoginCard />
    </>
  );
}
