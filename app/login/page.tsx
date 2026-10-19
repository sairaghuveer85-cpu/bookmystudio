import { Suspense } from 'react';
import type { Metadata } from 'next';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { LoginForm } from '@/components/auth/LoginForm';

export const metadata: Metadata = {
  title: 'Sign In — BookMyStudio',
  description: 'Sign in to access your production bookings, call sheet rosters, and commercial stage holds.',
};

export default function LoginPage() {
  return (
    <AuthLayout
      title="Welcome Back to BookMyStudio"
      subtitle="Sign in to manage commercial stage bookings, call sheets, and equipment holds."
      footerPrompt={{
        text: "Don't have a production account?",
        linkText: "Create Account",
        linkHref: "/create-account",
      }}
    >
      <Suspense fallback={<div className="h-48 flex items-center justify-center text-xs text-slate-400">Loading sign in...</div>}>
        <LoginForm />
      </Suspense>
    </AuthLayout>
  );
}

