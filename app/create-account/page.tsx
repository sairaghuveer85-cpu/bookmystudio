import { Suspense } from 'react';
import type { Metadata } from 'next';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { SignupForm } from '@/components/auth/SignupForm';

export const metadata: Metadata = {
  title: 'Create Account — BookMyStudio',
  description: 'Create an account to discover verified cycloramas, soundstages, filming locations, and union crew.',
};

export default function CreateAccountPage() {
  return (
    <AuthLayout
      title="Create Your Production Account"
      subtitle="Join verified line producers, commercial directors, and DP department heads."
      footerPrompt={{
        text: 'Already registered on BookMyStudio?',
        linkText: 'Sign In',
        linkHref: '/login',
      }}
    >
      <Suspense fallback={<div className="h-64 flex items-center justify-center text-xs text-slate-400">Loading registration...</div>}>
        <SignupForm />
      </Suspense>
    </AuthLayout>
  );
}

