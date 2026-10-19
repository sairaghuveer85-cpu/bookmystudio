import { Suspense } from 'react';
import type { Metadata } from 'next';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { EmailOtpForm } from '@/components/auth/EmailOtpForm';

export const metadata: Metadata = {
  title: 'Verify Your Email — BookMyStudio',
  description: 'Enter your 6-digit confirmation code to verify your production account email.',
};

export default function VerifyEmailPage() {
  return (
    <AuthLayout
      title="Verify Your Work Email"
      subtitle="Security verification is required for commercial stage liability and COI policy access."
      footerPrompt={{
        text: 'Need assistance with your call-sheet credentials?',
        linkText: 'Contact Support',
        linkHref: '/contact',
      }}
    >
      <Suspense fallback={<div className="h-48 flex items-center justify-center text-xs text-slate-400">Loading verification...</div>}>
        <EmailOtpForm />
      </Suspense>
    </AuthLayout>
  );
}

