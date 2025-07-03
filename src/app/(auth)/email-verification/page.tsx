import VerificationEmail from "@/components/auth/VerificationEmail";
interface Props {
  searchParams: { token?: string; email?: string };
}

export default function EmailVerification({ searchParams }: Props) {
  const { email, token } = searchParams;


  if (!token || !email) {
    return (
      <div className="max-w-md mx-auto mt-10">
        <h1>No email and token found</h1>
      </div>
    );
  }

  return <VerificationEmail email={email} token={token}/>
}