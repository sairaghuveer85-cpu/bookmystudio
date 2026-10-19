'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MailIcon, CheckCircleIcon } from '@/components/ui/Icons';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '@/context/AuthContext';

export function ForgotPasswordForm() {
  const { isConfigured } = useAuth();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      setErrorMsg('Please enter a valid work email address.');
      return;
    }

    if (!isConfigured) {
      setErrorMsg('Supabase is not configured yet. Configure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local.');
      return;
    }

    setIsLoading(true);

    try {
      const supabase = createClient();
      const origin = window.location.origin;
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${origin}/auth/callback?next=/reset-password`,
      });

      if (error) {
        setErrorMsg(error.message);
        return;
      }

      // Show generic confirmation to prevent user enumeration
      setIsSubmitted(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unable to dispatch recovery email.';
      setErrorMsg(msg);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="space-y-6 text-center">
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#181818] border border-slate-200 dark:border-[#303030] text-xs text-slate-600 dark:text-[#B3B3B3] space-y-2">
          <CheckCircleIcon className="w-8 h-8 text-emerald-600 dark:text-emerald-400 mx-auto" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-[#F5F5F5]">
            Recovery Instructions Dispatched
          </h3>
          <p className="leading-relaxed">
            If an account is associated with <strong className="text-slate-800 dark:text-[#F5F5F5]">{email}</strong>, a secure password reset link has been sent. Please check your inbox and spam folder.
          </p>
        </div>

        <Link
          href="/login"
          className="inline-block w-full py-3 bg-slate-900 hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-xs cursor-pointer"
        >
          Return to Sign In
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {errorMsg && (
        <div
          role="alert"
          className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-800 dark:text-red-300 text-xs space-y-1"
        >
          <div className="font-semibold">Recovery request failed</div>
          <div>{errorMsg}</div>
        </div>
      )}

      <div>
        <label htmlFor="email" className="block text-xs font-semibold text-slate-700 dark:text-[#F5F5F5] mb-1">
          Registered Work Email
        </label>
        <div className="relative">
          <MailIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-[#8A8A8A] pointer-events-none" />
          <input
            id="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="producer@agency.com"
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-[#181818] border border-slate-200 dark:border-[#303030] rounded-xl text-xs sm:text-sm text-slate-900 dark:text-[#F5F5F5] placeholder:text-slate-400 dark:placeholder:text-[#737373] focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white dark:focus:bg-[#202020] transition-all"
          />
        </div>
        <p className="mt-1 text-[11px] text-slate-500 dark:text-[#8A8A8A]">
          We will send a one-time secure link to reset your account credentials.
        </p>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 bg-slate-900 hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 disabled:bg-slate-400 dark:disabled:bg-[#303030] text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-xs active:scale-[0.98] hover:scale-[1.01] cursor-pointer flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>Sending Recovery Link...</span>
          </>
        ) : (
          <span>Send Password Reset Link</span>
        )}
      </button>

      <div className="pt-2 text-center">
        <Link
          href="/login"
          className="text-xs font-semibold text-slate-600 dark:text-[#8A8A8A] hover:text-slate-900 dark:hover:text-[#F5F5F5] transition-colors"
        >
          &larr; Back to Sign In
        </Link>
      </div>
    </form>
  );
}
