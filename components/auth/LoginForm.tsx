'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { EyeIcon, EyeOffIcon, MailIcon, LockIcon } from '@/components/ui/Icons';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '@/context/AuthContext';

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextUrl = searchParams.get('next') || '/dashboard';
  const resetSuccess = searchParams.get('reset') === 'success';

  const { isConfigured, refreshUser } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!email.trim() || !password) {
      setErrorMsg('Please enter both email address and password.');
      return;
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMsg('Please enter a valid work email address.');
      return;
    }

    if (!isConfigured) {
      setErrorMsg('Supabase is not configured yet. Please configure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local to enable live authentication.');
      return;
    }

    setIsLoading(true);

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        if (error.message.toLowerCase().includes('email not confirmed')) {
          setErrorMsg('Your email has not been verified yet. Please check your inbox or verify your code.');
          router.push(`/verify-email?email=${encodeURIComponent(email.trim())}`);
          return;
        }
        setErrorMsg(error.message);
        return;
      }

      if (data.session) {
        await refreshUser();
        // Safe redirect ensuring relative path to prevent open redirect vulnerabilities
        const safeDestination = nextUrl.startsWith('/') ? nextUrl : '/dashboard';
        router.push(safeDestination);
        router.refresh();
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'An unexpected error occurred during sign in.';
      setErrorMsg(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {/* Password Reset Success Notice */}
      {resetSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 text-xs flex items-center gap-2">
          <span className="font-semibold">Password updated successfully!</span>
          <span>Please sign in with your new credentials.</span>
        </div>
      )}

      {/* Error Message */}
      {errorMsg && (
        <div
          role="alert"
          className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-800 dark:text-red-300 text-xs space-y-1"
        >
          <div className="font-semibold">Authentication failed</div>
          <div>{errorMsg}</div>
        </div>
      )}

      {/* Email Input */}
      <div>
        <label htmlFor="email" className="block text-xs font-semibold text-slate-700 dark:text-[#F5F5F5] mb-1">
          Work Email Address
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
      </div>

      {/* Password Input */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <label htmlFor="password" className="block text-xs font-semibold text-slate-700 dark:text-[#F5F5F5]">
            Password
          </label>
          <Link
            href="/forgot-password"
            className="text-[11px] font-semibold text-slate-500 dark:text-[#8A8A8A] hover:text-slate-900 dark:hover:text-emerald-400 transition-colors"
          >
            Forgot password?
          </Link>
        </div>
        <div className="relative">
          <LockIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-[#8A8A8A] pointer-events-none" />
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••••••"
            className="w-full pl-10 pr-10 py-2.5 bg-slate-50 dark:bg-[#181818] border border-slate-200 dark:border-[#303030] rounded-xl text-xs sm:text-sm text-slate-900 dark:text-[#F5F5F5] placeholder:text-slate-400 dark:placeholder:text-[#737373] focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white dark:focus:bg-[#202020] transition-all"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-[#8A8A8A] hover:text-slate-700 dark:hover:text-[#F5F5F5] p-1 cursor-pointer"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOffIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Remember Me Option */}
      <div className="flex items-center">
        <input
          id="remember-me"
          type="checkbox"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
          className="w-4 h-4 rounded border-slate-300 dark:border-[#454545] dark:bg-[#181818] text-emerald-600 focus:ring-emerald-500"
        />
        <label htmlFor="remember-me" className="ml-2 text-xs text-slate-600 dark:text-[#B3B3B3] select-none cursor-pointer">
          Remember this production device
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 bg-slate-900 hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 disabled:bg-slate-400 dark:disabled:bg-[#303030] text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-xs active:scale-[0.98] hover:scale-[1.01] cursor-pointer flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>Verifying Credentials...</span>
          </>
        ) : (
          <span>Sign In to BookMyStudio</span>
        )}
      </button>
    </form>
  );
}
