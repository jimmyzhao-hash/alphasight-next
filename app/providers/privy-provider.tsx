'use client';

import { PrivyProvider } from '@privy-io/react-auth';
import { PropsWithChildren } from 'react';

export function PrivyClientProvider({ children }: PropsWithChildren) {
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ''}
      config={{
        loginMethods: ['email', 'wallet'],
        appearance: {
          theme: 'light',
          accentColor: '#000000',
        },
      }}
    >
      {children}
    </PrivyProvider>
  );
}