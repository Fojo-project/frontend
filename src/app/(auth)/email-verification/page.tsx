import VerificationEmail from "@/components/auth/VerificationEmail";
interface Props {
  searchParams: Promise<{ token?: string; email?: string }>;
}

export default async function EmailVerification({ searchParams }: Props) {
  const { email, token } = await searchParams;

  if (!token || !email) {
    return (
      <div className="max-w-md mx-auto mt-10">
        <h1>No email and token found</h1>
      </div>
    );
  }

  return <VerificationEmail email={email} token={token} />
}