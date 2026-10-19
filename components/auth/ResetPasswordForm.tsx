'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { EyeIcon, EyeOffIcon, LockIcon } from '@/components/ui/Icons';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '@/context/AuthContext';

export function ResetPasswordForm() {
  const router = useRouter();
  const { isConfigured, refreshUser } = useAuth();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const validate = (): boolean => {
    const errors: Record<string, string> = {};

    if (!password) {
      errors.password = 'New password is required.';
    } else if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters in length.';
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGlobalError(null);

    if (!validate()) return;

    if (!isConfigured) {
      setGlobalError('Supabase is not configured yet. Configure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local.');
      return;
    }

    setIsLoading(true);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({
        password,
      });

      if (error) {
        setGlobalError(error.message);
        return;
      }

      await refreshUser();
      router.push('/login?reset=success');
      router.refresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unable to update password.';
      setGlobalError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {globalError && (
        <div
          role="alert"
          className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-800 dark:text-red-300 text-xs space-y-1"
        >
          <div className="font-semibold">Password update failed</div>
          <div>{globalError}</div>
        </div>
      )}

      {/* New Password */}
      <div>
        <label htmlFor="new-password" className="block text-xs font-semibold text-slate-700 dark:text-[#F5F5F5] mb-1">
          New Password
        </label>
        <div className="relative">
          <LockIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-[#8A8A8A] pointer-events-none" />
          <input
            id="new-password"
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

      {/* Confirm New Password */}
      <div>
        <label htmlFor="confirm-new-password" className="block text-xs font-semibold text-slate-700 dark:text-[#F5F5F5] mb-1">
          Confirm New Password
        </label>
        <div className="relative">
          <LockIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-[#8A8A8A] pointer-events-none" />
          <input
            id="confirm-new-password"
            type={showConfirmPassword ? 'text' : 'password'}
            autoComplete="new-password"
            required
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              if (fieldErrors.confirmPassword) setFieldErrors({ ...fieldErrors, confirmPassword: '' });
            }}
            placeholder="Repeat new password"
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

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 bg-slate-900 hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 disabled:bg-slate-400 dark:disabled:bg-[#303030] text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-xs active:scale-[0.98] hover:scale-[1.01] cursor-pointer flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>Updating Password...</span>
          </>
        ) : (
          <span>Set New Password &amp; Sign In</span>
        )}
      </button>
    </form>
  );
}
