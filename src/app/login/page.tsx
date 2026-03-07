import Link from 'next/link';
import { AuthPanel } from '@/components/auth/auth-panel';

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-zinc-50 px-4 py-12">
      <AuthPanel mode="login" />
      <p className="mx-auto mt-4 max-w-md text-sm text-zinc-600">
        No account yet?{' '}
        <Link href="/register" className="font-medium text-zinc-900 underline">
          Create one
        </Link>
        .
      </p>
    </main>
  );
}
