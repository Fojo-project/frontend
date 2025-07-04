'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import VerificationEmail from '@/components/auth/VerificationEmail';
import AlertMessage from '@/components/common/AlertMessage';

export default function EmailVerification() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const token = searchParams.get('token');

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
    if (!email || !token) {
      showAlert({
        type: 'error',
        message: 'Email and token are required.',
      });
    }
  }, [email, token]);

  if (!email || !token) {
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

  return (<Suspense>
    <VerificationEmail email={email} token={token} />;
  </Suspense>)
}
