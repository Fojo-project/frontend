'use client';

import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/store';
import useHydrateAuth from '@/hooks/useHydrateAuth';

interface ProvidersProps {
  children: ReactNode;
}

function HydrateAuthWrapper({ children }: { children: ReactNode }) {
  useHydrateAuth();
  return <>{children}</>;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <Provider store={store}>
      <HydrateAuthWrapper>{children}</HydrateAuthWrapper>
    </Provider>
  );
}
