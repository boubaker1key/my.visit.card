// app/actions.ts
'use server';

import { signIn } from 'app/auth';
import { redirect } from 'next/navigation';

export async function loginAction(formData: FormData) {
  try {
    const result = await signIn('credentials', {
      redirect: true,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    });

    if (result.error) {
      return { error: result.error };
    }

    redirect('/protected');
  } catch (err) {
    return { error: err instanceof Error ? err.message : 'Invalid credentials' };
  }
}
