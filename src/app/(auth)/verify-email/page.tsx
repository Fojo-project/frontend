import ResendVerificationEmail from "@/components/auth/ResendEmailVerification";

interface VerifyEmailPageProps {
  searchParams: Promise<{ email?: string }>;
}

export default async function Page({ searchParams }: VerifyEmailPageProps) {
  const { email } = await searchParams;

  if (!email) return <div>Email is required</div>;

  return <ResendVerificationEmail email={email} />;
}
