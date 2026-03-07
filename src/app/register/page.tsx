import Link from 'next/link';
import { createSupabaseServerClient } from '../../lib/supabase/server';
import { RegisterForm } from '../../components/auth/register-form';
import { LogoutButton } from '../../components/auth/logout-button';

export default async function RegisterPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <main className="mx-auto max-w-md p-6">
        <h1 className="mb-4 text-2xl font-semibold">Register</h1>
        <RegisterForm />
        <p className="mt-4 text-sm">
          Already registered? <Link href="/login" className="underline">Sign in</Link>
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-md space-y-4 p-6">
      <h1 className="text-2xl font-semibold">Account already authenticated</h1>
      <p className="text-sm text-gray-700">Signed in as {user.email}</p>
      <LogoutButton />
    </main>
  );
}
