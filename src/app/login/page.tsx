import { AuthPanel } from '@/components/auth/auth-panel';

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-12">
      <AuthPanel mode="login" />
    </main>
  );
}
