'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ResendVerificationEmail from '@/components/auth/ResendEmailVerification';
import AlertMessage from '@/components/common/AlertMessage';

export default function Page() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  const [alert, setAlert] = useState<{
    type: 'success' | 'error';
    message: string;
    id?: number;
  } | null>(null);

  const showAlert = (alertObj: {
    type: 'success' | 'error';
    message: string;
  }) => {
    setAlert({ ...alertObj, id: Date.now() });
  };

  useEffect(() => {
    if (!email) {
      showAlert({
        type: 'error',
        message: 'Email is required to resend verification link.',
      });
    }
  }, [email]);

  if (!email) {
    return (
      <div className="max-w-md mx-auto mt-10">
        {alert && (
          <AlertMessage
            key={alert.id}
            type={alert.type}
            message={alert.message}
            duration={7000}
            className="mb-4"
          />
        )}
      </div>
    );
  }

  return <ResendVerificationEmail email={email} />;
}
