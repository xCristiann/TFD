import Link from 'next/link';
import { createSupabaseServerClient } from '../../lib/supabase/server';
import { LoginForm } from '../../components/auth/login-form';
import { LogoutButton } from '../../components/auth/logout-button';

export default async function LoginPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <main className="mx-auto max-w-md p-6">
        <h1 className="mb-4 text-2xl font-semibold">Login</h1>
        <LoginForm />
        <p className="mt-4 text-sm">
          New here? <Link href="/register" className="underline">Create an account</Link>
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-md space-y-4 p-6">
      <h1 className="text-2xl font-semibold">You are logged in</h1>
      <p className="text-sm text-gray-700">Signed in as {user.email}</p>
      <LogoutButton />
    </main>
  );
}
