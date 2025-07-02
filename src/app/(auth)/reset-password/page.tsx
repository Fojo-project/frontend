import ResetPassword from '@/components/auth/ResetPassword';
import AlertMessage from '@/components/common/AlertMessage';

interface Props {
  searchParams: { token?: string; email?: string };
}

export default function Page({ searchParams }: Props) {
  const { email, token } = searchParams;

  if (!token || !email) {
    return (
      <div className="max-w-md mx-auto mt-10">
        <AlertMessage
          type="error"
          message="Invalid or missing password reset token or email."
        />
      </div>
    );
  }

  return <ResetPassword token={token} email={email} />;
}
