'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { EyeIcon, EyeOffIcon, MailIcon, LockIcon, UserIcon } from '@/components/ui/Icons';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '@/context/AuthContext';

export function SignupForm() {
  const router = useRouter();
  const { isConfigured } = useAuth();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const validate = (): boolean => {
    const errors: Record<string, string> = {};

    if (!fullName.trim()) {
      errors.fullName = 'Full legal or production name is required.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      errors.email = 'Email address is required.';
    } else if (!emailRegex.test(email.trim())) {
      errors.email = 'Please provide a valid email address.';
    }

    if (!password) {
      errors.password = 'Password is required.';
    } else if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters in length.';
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match.';
    }

    if (!agreeTerms) {
      errors.agreeTerms = 'You must agree to the Terms of Service and Privacy Policy to register.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGlobalError(null);

    if (!validate()) {
      return;
    }

    if (!isConfigured) {
      setGlobalError('Supabase is not configured yet. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local to enable real account creation.');
      return;
    }

    setIsLoading(true);

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            full_name: fullName.trim(),
          },
        },
      });

      if (error) {
        setGlobalError(error.message);
        return;
      }

      // If user was created, route to email OTP verification
      if (data.user) {
        router.push(`/verify-email?email=${encodeURIComponent(email.trim())}`);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'An error occurred while creating your account.';
      setGlobalError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {/* Global Error Banner */}
      {globalError && (
        <div
          role="alert"
          className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-800 dark:text-red-300 text-xs space-y-1"
        >
          <div className="font-semibold">Unable to create account</div>
          <div>{globalError}</div>
        </div>
      )}

      {/* Full Name */}
      <div>
        <label htmlFor="fullName" className="block text-xs font-semibold text-slate-700 dark:text-[#F5F5F5] mb-1">
          Full Name / Producer Entity
        </label>
        <div className="relative">
          <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-[#8A8A8A] pointer-events-none" />
          <input
            id="fullName"
            type="text"
            autoComplete="name"
            required
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
              if (fieldErrors.fullName) setFieldErrors({ ...fieldErrors, fullName: '' });
            }}
            placeholder="Marcus Chen"
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-[#181818] border border-slate-200 dark:border-[#303030] rounded-xl text-xs sm:text-sm text-slate-900 dark:text-[#F5F5F5] placeholder:text-slate-400 dark:placeholder:text-[#737373] focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white dark:focus:bg-[#202020] transition-all"
            aria-invalid={Boolean(fieldErrors.fullName)}
          />
        </div>
        {fieldErrors.fullName && (
          <p className="mt-1 text-[11px] text-red-600 dark:text-red-400 font-medium">{fieldErrors.fullName}</p>
        )}
      </div>

      {/* Email */}
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
            onChange={(e) => {
              setEmail(e.target.value);
              if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: '' });
            }}
            placeholder="marcus@productioncompany.com"
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-[#181818] border border-slate-200 dark:border-[#303030] rounded-xl text-xs sm:text-sm text-slate-900 dark:text-[#F5F5F5] placeholder:text-slate-400 dark:placeholder:text-[#737373] focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white dark:focus:bg-[#202020] transition-all"
            aria-invalid={Boolean(fieldErrors.email)}
          />
        </div>
        {fieldErrors.email && (
          <p className="mt-1 text-[11px] text-red-600 dark:text-red-400 font-medium">{fieldErrors.email}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <label htmlFor="password" className="block text-xs font-semibold text-slate-700 dark:text-[#F5F5F5] mb-1">
          Create Password
        </label>
        <div className="relative">
          <LockIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-[#8A8A8A] pointer-events-none" />
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="new-password"
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (fieldErrors.password) setFieldErrors({ ...fieldErrors, password: '' });
            }}
            placeholder="Minimum 8 characters"
            className="w-full pl-10 pr-10 py-2.5 bg-slate-50 dark:bg-[#181818] border border-slate-200 dark:border-[#303030] rounded-xl text-xs sm:text-sm text-slate-900 dark:text-[#F5F5F5] placeholder:text-slate-400 dark:placeholder:text-[#737373] focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white dark:focus:bg-[#202020] transition-all"
            aria-invalid={Boolean(fieldErrors.password)}
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
        {fieldErrors.password && (
          <p className="mt-1 text-[11px] text-red-600 dark:text-red-400 font-medium">{fieldErrors.password}</p>
        )}
      </div>

      {/* Confirm Password */}
      <div>
        <label htmlFor="confirmPassword" className="block text-xs font-semibold text-slate-700 dark:text-[#F5F5F5] mb-1">
          Confirm Password
        </label>
        <div className="relative">
          <LockIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-[#8A8A8A] pointer-events-none" />
          <input
            id="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            autoComplete="new-password"
            required
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              if (fieldErrors.confirmPassword) setFieldErrors({ ...fieldErrors, confirmPassword: '' });
            }}
            placeholder="Repeat password"
            className="w-full pl-10 pr-10 py-2.5 bg-slate-50 dark:bg-[#181818] border border-slate-200 dark:border-[#303030] rounded-xl text-xs sm:text-sm text-slate-900 dark:text-[#F5F5F5] placeholder:text-slate-400 dark:placeholder:text-[#737373] focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white dark:focus:bg-[#202020] transition-all"
            aria-invalid={Boolean(fieldErrors.confirmPassword)}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-[#8A8A8A] hover:text-slate-700 dark:hover:text-[#F5F5F5] p-1 cursor-pointer"
            aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
          >
            {showConfirmPassword ? <EyeOffIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
          </button>
        </div>
        {fieldErrors.confirmPassword && (
          <p className="mt-1 text-[11px] text-red-600 dark:text-red-400 font-medium">{fieldErrors.confirmPassword}</p>
        )}
      </div>

      {/* Terms & Privacy Agreement */}
      <div>
        <div className="flex items-start">
          <input
            id="agree-terms"
            type="checkbox"
            checked={agreeTerms}
            onChange={(e) => {
              setAgreeTerms(e.target.checked);
              if (fieldErrors.agreeTerms) setFieldErrors({ ...fieldErrors, agreeTerms: '' });
            }}
            className="mt-0.5 w-4 h-4 rounded border-slate-300 dark:border-[#454545] dark:bg-[#181818] text-emerald-600 focus:ring-emerald-500"
          />
          <label htmlFor="agree-terms" className="ml-2 text-xs text-slate-600 dark:text-[#B3B3B3] leading-snug cursor-pointer">
            I agree to BookMyStudio&apos;s{' '}
            <Link href="/terms" target="_blank" className="font-semibold text-slate-900 dark:text-emerald-400 underline">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" target="_blank" className="font-semibold text-slate-900 dark:text-emerald-400 underline">
              Privacy Policy
            </Link>
            .
          </label>
        </div>
        {fieldErrors.agreeTerms && (
          <p className="mt-1 text-[11px] text-red-600 dark:text-red-400 font-medium">{fieldErrors.agreeTerms}</p>
        )}
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
            <span>Sending Verification Code...</span>
          </>
        ) : (
          <span>Create Production Account</span>
        )}
      </button>
    </form>
  );
}
