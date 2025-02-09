'use client';

import { usePrivy } from '@privy-io/react-auth';
import { PropsWithChildren } from 'react';

export function AuthWrapper({ children }: PropsWithChildren) {
  const { login, authenticated, ready } = usePrivy();

  if (!ready) {
    return <div>Loading...</div>;
  }

  if (!authenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <button
          onClick={login}
          className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
        >
          Login with Privy
        </button>
      </div>
    );
  }

  return <>{children}</>;
}