'use client';

import { useRouter } from 'next/navigation';
import { createSupabaseBrowserClient } from '../../lib/supabase/client';

export function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signOut();
    router.refresh();
  }

  return (
    <button onClick={handleLogout} className="rounded-md border px-4 py-2 text-sm font-medium">
      Logout
    </button>
  );
}
