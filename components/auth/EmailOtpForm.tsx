'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircleIcon } from '@/components/ui/Icons';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '@/context/AuthContext';

export function EmailOtpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailParam = searchParams.get('email') || '';
  const { isConfigured, refreshUser } = useAuth();

  const email = emailParam;
  const [digits, setDigits] = useState<string[]>(['', '', '', '', '', '']);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [cooldown, setCooldown] = useState(60);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Cooldown countdown timer
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  // Focus first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  // Mask email for display: m***@domain.com
  const maskedEmail = React.useMemo(() => {
    if (!email) return 'your work email';
    const parts = email.split('@');
    if (parts.length !== 2) return email;
    const name = parts[0];
    const domain = parts[1];
    if (name.length <= 2) {
      return `${name[0]}***@${domain}`;
    }
    return `${name[0]}${'*'.repeat(Math.max(name.length - 2, 3))}${name[name.length - 1]}@${domain}`;
  }, [email]);

  const handleDigitChange = (index: number, val: string) => {
    setErrorMsg(null);
    const cleaned = val.replace(/[^0-9]/g, '');

    const newDigits = [...digits];
    newDigits[index] = cleaned.slice(-1); // Keep last entered character
    setDigits(newDigits);

    // Auto-advance to next input if filled
    if (cleaned && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (!digits[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/[^0-9]/g, '').slice(0, 6);
    if (!pasted) return;

    const newDigits = [...digits];
    for (let i = 0; i < 6; i++) {
      newDigits[i] = pasted[i] || '';
    }
    setDigits(newDigits);

    // Focus the next empty slot or the last one
    const nextEmptyIndex = newDigits.findIndex((d) => d === '');
    if (nextEmptyIndex !== -1) {
      inputRefs.current[nextEmptyIndex]?.focus();
    } else {
      inputRefs.current[5]?.focus();
    }
  };

  const fullCode = digits.join('');
  const isComplete = fullCode.length === 6;

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!isComplete) {
      setErrorMsg('Please enter all 6 digits of your verification code.');
      return;
    }

    if (!email) {
      setErrorMsg('No email address provided for verification. Please register or sign in again.');
      return;
    }

    if (!isConfigured) {
      setErrorMsg('Supabase is not configured yet. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local to enable live verification.');
      return;
    }

    setIsLoading(true);

    try {
      const supabase = createClient();
      // Verify OTP through Supabase auth
      const { error } = await supabase.auth.verifyOtp({
        email: email.trim(),
        token: fullCode,
        type: 'signup',
      });

      if (error) {
        // Retry with 'email' type if 'signup' type returns error (supports both magic link & signup confirmations)
        const retryResult = await supabase.auth.verifyOtp({
          email: email.trim(),
          token: fullCode,
          type: 'email',
        });

        if (retryResult.error) {
          setErrorMsg(retryResult.error.message || 'Invalid or expired verification code.');
          return;
        }
      }

      await refreshUser();
      router.push('/dashboard?verified=true');
      router.refresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to verify verification code.';
      setErrorMsg(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (cooldown > 0 || isResending) return;
    setErrorMsg(null);
    setResendSuccess(false);

    if (!email) {
      setErrorMsg('Please enter your email to request a new code.');
      return;
    }

    if (!isConfigured) {
      setErrorMsg('Supabase credentials are not configured in .env.local.');
      return;
    }

    setIsResending(true);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email.trim(),
      });

      if (error) {
        setErrorMsg(error.message);
        return;
      }

      setResendSuccess(true);
      setCooldown(60);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unable to dispatch resend request.';
      setErrorMsg(msg);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <form onSubmit={handleVerify} className="space-y-6" noValidate>
      {/* Sent Email Notice */}
      <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#181818] border border-slate-200 dark:border-[#303030] text-xs text-slate-600 dark:text-[#B3B3B3] flex items-start gap-2.5">
        <CheckCircleIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
        <div>
          We sent a 6-digit confirmation code to{' '}
          <span className="font-semibold text-slate-900 dark:text-[#F5F5F5]">{maskedEmail}</span>. Enter the code below to activate your commercial studio booking account.
        </div>
      </div>

      {/* Resend Success Message */}
      {resendSuccess && (
        <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs">
          A fresh 6-digit verification code has been dispatched to your email.
        </div>
      )}

      {/* Error Message */}
      {errorMsg && (
        <div
          role="alert"
          className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-800 dark:text-red-300 text-xs space-y-1"
        >
          <div className="font-semibold">Verification failed</div>
          <div>{errorMsg}</div>
        </div>
      )}

      {/* 6-Digit OTP Input Grid */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-[#F5F5F5] text-center mb-3">
          Enter 6-Digit Verification Code
        </label>
        <div className="flex items-center justify-center gap-1.5 sm:gap-3" onPaste={handlePaste}>
          {digits.map((digit, idx) => (
            <input
              key={idx}
              ref={(el) => {
                inputRefs.current[idx] = el;
              }}
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              pattern="[0-9]*"
              maxLength={1}
              value={digit}
              onChange={(e) => handleDigitChange(idx, e.target.value)}
              onKeyDown={(e) => handleKeyDown(idx, e)}
              className={`w-9 h-11 sm:w-12 sm:h-14 text-center text-base sm:text-xl font-mono font-bold rounded-lg sm:rounded-xl text-slate-900 dark:text-[#F5F5F5] focus:outline-none focus:ring-2 focus:scale-105 focus:bg-white dark:focus:bg-[#202020] transition-all duration-150 selection:bg-emerald-600 selection:text-white ${
                errorMsg
                  ? 'border-red-400 dark:border-red-600 bg-red-50/30 dark:bg-red-950/20 focus:ring-red-500'
                  : digit
                  ? 'bg-white dark:bg-[#202020] border-2 border-emerald-500/80 dark:border-emerald-500 shadow-2xs focus:ring-emerald-500'
                  : 'bg-slate-50 dark:bg-[#181818] border border-slate-200 dark:border-[#303030] focus:ring-emerald-500'
              }`}
              aria-label={`Digit ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!isComplete || isLoading}
        className="w-full py-3 bg-slate-900 hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 disabled:bg-slate-300 dark:disabled:bg-[#303030] disabled:cursor-not-allowed text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-xs active:scale-[0.98] hover:scale-[1.01] cursor-pointer flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>Verifying Code...</span>
          </>
        ) : (
          <span>Verify &amp; Enter Dashboard</span>
        )}
      </button>

      {/* Resend and Email Change Options */}
      <div className="pt-2 border-t border-slate-100 dark:border-[#262626] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-[#8A8A8A]">
        <button
          type="button"
          onClick={handleResend}
          disabled={cooldown > 0 || isResending}
          className="font-semibold text-slate-700 dark:text-[#F5F5F5] hover:text-slate-900 dark:hover:text-emerald-400 disabled:text-slate-400 dark:disabled:text-[#606060] cursor-pointer disabled:cursor-not-allowed transition-colors"
        >
          {cooldown > 0 ? `Resend Code in ${cooldown}s` : isResending ? 'Sending...' : 'Resend Verification Code'}
        </button>

        <Link
          href="/create-account"
          className="text-slate-500 dark:text-[#8A8A8A] hover:text-slate-800 dark:hover:text-[#F5F5F5] transition-colors"
        >
          Use a different email address
        </Link>
      </div>
    </form>
  );
}
