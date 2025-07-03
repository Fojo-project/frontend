import ResendVerificationEmail from "@/components/auth/ResendEmailVerification";

interface VerifyEmailPageProps {
  searchParams: { email?: string };
}

export default function Page({ searchParams }: VerifyEmailPageProps) {
  const email = searchParams.email;

  if (!email) return <div>Email is required</div>; 

  return <ResendVerificationEmail email={email} />;
}
