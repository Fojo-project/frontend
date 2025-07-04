import VerificationEmail from '@/components/auth/VerificationEmail';
import AlertMessage from '@/components/common/AlertMessage';

interface PageProps {
  searchParams: Promise<{ token?: string; email?: string }>;
}

export default async function EmailVerificationPage({ searchParams }: PageProps) {
  const { email, token } = await searchParams;

  if (!email || !token) {
    return (
      <div className="max-w-md mx-auto mt-10">
        <AlertMessage
          type="error"
          message="Missing or invalid verification token or email."
        />
      </div>
    );
  }

  return <VerificationEmail email={email} token={token} />;
}
