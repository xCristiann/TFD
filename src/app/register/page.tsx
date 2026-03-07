import Link from 'next/link';
import { AuthPanel } from '@/components/auth/auth-panel';

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-zinc-50 px-4 py-12">
      <AuthPanel mode="register" />
      <p className="mx-auto mt-4 max-w-md text-sm text-zinc-600">
        Already have an account?{' '}
        <Link href="/login" className="font-medium text-zinc-900 underline">
          Sign in
        </Link>
        .
      </p>
    </main>
  );
}
