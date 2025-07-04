import VerificationEmail from '@/components/auth/VerificationEmail';
import AlertMessage from '@/components/common/AlertMessage';

interface PageProps {
  searchParams: Promise<{ token?: string; email?: string }>;
}

export default async function EmailVerification({ searchParams }: PageProps) {
  const { email, token } = await searchParams;

  if (!token || !email) {
    return (
      <div className="max-w-md mx-auto mt-10">
        <AlertMessage
          type="error"
          message="Email and token are required."
        />
      </div>
    );
  }

  return <VerificationEmail email={email} token={token} />;
}
