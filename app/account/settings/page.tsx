'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { LockIcon, EyeIcon, EyeOffIcon, CheckCircleIcon } from '@/components/ui/Icons';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '@/context/AuthContext';

export default function AccountSettingsPage() {
  const router = useRouter();
  const { user, isLoading, isConfigured, signOut } = useAuth();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Notification state
  const [notifyCoi, setNotifyCoi] = useState(true);
  const [notifyCallSheet, setNotifyCallSheet] = useState(true);
  const [notifyOvertime, setNotifyOvertime] = useState(true);

  useEffect(() => {
    if (!isLoading && !user && isConfigured) {
      router.push('/login?next=/account/settings');
    }
  }, [user, isLoading, isConfigured, router]);

  const email = user?.email || 'producer@bookmystudio.com';
  const fullName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Producer';

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setUpdateSuccess(false);

    if (!password) {
      setErrorMsg('Please enter a new password.');
      return;
    }

    if (password.length < 8) {
      setErrorMsg('New password must be at least 8 characters in length.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    if (!isConfigured) {
      setErrorMsg('Supabase is not configured yet. Configure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local.');
      return;
    }

    setIsUpdating(true);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({
        password,
      });

      if (error) {
        setErrorMsg(error.message);
        return;
      }

      setUpdateSuccess(true);
      setPassword('');
      setConfirmPassword('');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unable to update password.';
      setErrorMsg(msg);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
    router.refresh();
  };

  return (
    <div className="py-8 bg-white dark:bg-[#101010] min-h-[calc(100vh-140px)] text-slate-900 dark:text-[#F5F5F5] transition-colors duration-150">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: 'Production Dashboard', href: '/dashboard' },
            { label: 'Account Profile', href: '/account' },
            { label: 'Settings' },
          ]}
          className="mb-6"
        />

        {/* Page Header */}
        <div className="pb-6 border-b border-slate-100 dark:border-[#202020] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-[#F5F5F5]">
              Account &amp; Security Settings
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-[#B3B3B3]">
              Update your authentication credentials and shoot notification preferences.
            </p>
          </div>

          <button
            type="button"
            onClick={handleSignOut}
            className="px-3.5 py-2 rounded-lg border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 text-xs font-semibold transition-colors cursor-pointer self-start sm:self-auto"
          >
            Sign Out
          </button>
        </div>

        <div className="mt-8 space-y-8">
          {/* Section 1: Connected Credentials */}
          <div className="p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-[#303030] bg-white dark:bg-[#181818]">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-[#F5F5F5] mb-1">
              Production Entity Credentials
            </h2>
            <p className="text-xs text-slate-500 dark:text-[#8A8A8A] mb-4">
              Your registered primary contact email and commercial name.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-500 dark:text-[#8A8A8A] font-medium mb-1">Entity Name</label>
                <div className="p-2.5 bg-slate-50 dark:bg-[#202020] border border-slate-200 dark:border-[#303030] rounded-lg text-slate-900 dark:text-[#F5F5F5] font-semibold">
                  {fullName}
                </div>
              </div>

              <div>
                <label className="block text-slate-500 dark:text-[#8A8A8A] font-medium mb-1">Registered Work Email</label>
                <div className="p-2.5 bg-slate-50 dark:bg-[#202020] border border-slate-200 dark:border-[#303030] rounded-lg text-slate-900 dark:text-[#F5F5F5] font-semibold">
                  {email}
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Update Password Form */}
          <div className="p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-[#303030] bg-white dark:bg-[#181818]">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-[#F5F5F5] mb-1">
              Change Account Password
            </h2>
            <p className="text-xs text-slate-500 dark:text-[#8A8A8A] mb-4">
              Ensure your password is at least 8 characters in length.
            </p>

            {updateSuccess && (
              <div className="mb-4 p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircleIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Password updated successfully in authentication provider.</span>
              </div>
            )}

            {errorMsg && (
              <div className="mb-4 p-3 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-800 dark:text-red-300 text-xs">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handlePasswordUpdate} className="space-y-4 max-w-md">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-[#F5F5F5] mb-1">
                  New Password
                </label>
                <div className="relative">
                  <LockIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-[#8A8A8A]" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-10 py-2.5 bg-slate-50 dark:bg-[#202020] border border-slate-200 dark:border-[#303030] rounded-xl text-xs sm:text-sm text-slate-900 dark:text-[#F5F5F5] placeholder:text-slate-400 dark:placeholder:text-[#737373] focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white dark:focus:bg-[#262626] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-[#8A8A8A] hover:text-slate-700 dark:hover:text-[#F5F5F5] p-1 cursor-pointer"
                  >
                    {showPassword ? <EyeOffIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-[#F5F5F5] mb-1">
                  Confirm New Password
                </label>
                <div className="relative">
                  <LockIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-[#8A8A8A]" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-[#202020] border border-slate-200 dark:border-[#303030] rounded-xl text-xs sm:text-sm text-slate-900 dark:text-[#F5F5F5] placeholder:text-slate-400 dark:placeholder:text-[#737373] focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white dark:focus:bg-[#262626] transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isUpdating}
                className="py-2.5 px-4 bg-slate-900 hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 disabled:bg-slate-400 dark:disabled:bg-[#303030] text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
              >
                {isUpdating ? 'Updating Password...' : 'Save New Password'}
              </button>
            </form>
          </div>

          {/* Section 3: Shoot & Call Sheet Notification Preferences */}
          <div className="p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-[#303030] bg-white dark:bg-[#181818] space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-[#F5F5F5] mb-1">
              Call Sheet &amp; Stage Notifications
            </h2>
            <p className="text-xs text-slate-500 dark:text-[#8A8A8A] mb-4">
              Configure automated notifications dispatched to your production team.
            </p>

            <div className="space-y-3 text-xs">
              <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-[#202020] border border-slate-200 dark:border-[#303030] hover:border-slate-300 dark:hover:border-[#454545] cursor-pointer transition-colors">
                <div>
                  <div className="font-bold text-slate-900 dark:text-[#F5F5F5]">Certificate of Insurance (COI) Endorsements</div>
                  <div className="text-[11px] text-slate-500 dark:text-[#8A8A8A]">Receive automated copies of host COI certificates 24h prior to load-in.</div>
                </div>
                <input
                  type="checkbox"
                  checked={notifyCoi}
                  onChange={(e) => setNotifyCoi(e.target.checked)}
                  className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-[#202020] border border-slate-200 dark:border-[#303030] hover:border-slate-300 dark:hover:border-[#454545] cursor-pointer transition-colors">
                <div>
                  <div className="font-bold text-slate-900 dark:text-[#F5F5F5]">Call Sheet Crew Dispatch Updates</div>
                  <div className="text-[11px] text-slate-500 dark:text-[#8A8A8A]">Alerts when selected department head agents accept 48h hold notices.</div>
                </div>
                <input
                  type="checkbox"
                  checked={notifyCallSheet}
                  onChange={(e) => setNotifyCallSheet(e.target.checked)}
                  className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-[#202020] border border-slate-200 dark:border-[#303030] hover:border-slate-300 dark:hover:border-[#454545] cursor-pointer transition-colors">
                <div>
                  <div className="font-bold text-slate-900 dark:text-[#F5F5F5]">Overtime &amp; Wrap Reminders</div>
                  <div className="text-[11px] text-slate-500 dark:text-[#8A8A8A]">SMS / Email alerts at the 9-hour mark before commercial 1.5x overtime begins.</div>
                </div>
                <input
                  type="checkbox"
                  checked={notifyOvertime}
                  onChange={(e) => setNotifyOvertime(e.target.checked)}
                  className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                />
              </label>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
