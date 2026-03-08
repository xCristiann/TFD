'use client';

import Link from 'next/link';
import { FormEvent, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Session } from '@supabase/supabase-js';

import { createClient } from '@/lib/supabase/client';

type Mode = 'login' | 'register';

type AuthPanelProps = {
  mode: Mode;
};

export function AuthPanel({ mode }: AuthPanelProps) {
  const supabase = useMemo(() => createClient(), []);
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (isMounted) {
        setSession(data.session ?? null);
      }
    });

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (isMounted) {
        setSession(nextSession);
      }
      router.refresh();
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [router, supabase]);

  const submitLabel = mode === 'login' ? 'Sign in securely' : 'Create trading account';

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    if (mode === 'login') {
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });

      if (signInError) {
        setError(signInError.message);
      } else {
        setMessage('Successfully signed in.');
      }
    } else {
      const { error: signUpError } = await supabase.auth.signUp({ email, password });

      if (signUpError) {
        setError(signUpError.message);
      } else {
        setMessage('Account created. Check your email if confirmation is enabled.');
      }
    }

    setLoading(false);
  };

  const handleLogout = async () => {
    setLoading(true);
    const { error: signOutError } = await supabase.auth.signOut();
    setError(signOutError?.message ?? null);
    setMessage(signOutError ? null : 'You have been logged out.');
    if (!signOutError) {
      setSession(null);
    }
    setLoading(false);
  };

  return (
    <div className="panel w-full max-w-md p-8">
      <p className="text-xs uppercase tracking-[0.2em] text-accent">Secure portal</p>
      <h1 className="mt-3 text-2xl font-semibold text-white">{mode === 'login' ? 'Welcome back' : 'Create your profile'}</h1>
      <p className="mt-2 text-sm text-muted">Access challenge accounts, metrics, and payout operations in one workspace.</p>

      {session ? (
        <div className="mt-6 space-y-4">
          <p className="text-sm text-foreground">Signed in as {session.user.email}</p>
          <button type="button" onClick={handleLogout} disabled={loading} className="btn-secondary w-full">
            {loading ? 'Processing...' : 'Logout'}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="mb-1 block text-sm text-muted">Email</label>
            <input id="email" name="email" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} className="input-premium" />
          </div>
          <div>
            <label htmlFor="password" className="mb-1 block text-sm text-muted">Password</label>
            <input id="password" name="password" type="password" minLength={8} required value={password} onChange={(event) => setPassword(event.target.value)} className="input-premium" />
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full">{loading ? 'Processing...' : submitLabel}</button>
        </form>
      )}

      <p className="mt-6 text-xs text-muted">
        {mode === 'login' ? 'New trader?' : 'Already registered?'}{' '}
        <Link className="text-accent" href={mode === 'login' ? '/register' : '/login'}>
          {mode === 'login' ? 'Create account' : 'Sign in'}
        </Link>
      </p>

      {message ? <p className="mt-4 text-sm text-accent.success">{message}</p> : null}
      {error ? <p className="mt-4 text-sm text-accent.danger">{error}</p> : null}
    </div>
  );
}
