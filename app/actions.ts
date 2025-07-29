// app/actions.ts
'use server';

import { signIn } from 'app/auth';
import { redirect } from 'next/navigation';

export async function loginAction(formData: FormData) {
  try {
    const result = await signIn('credentials', {
      redirect: false,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    });

    if (result?.error) {
      return { error: result.error };
    }
    return Response.redirect(new URL('/protected', nextUrl));
    //redirect('/protected');
  } catch (err) {
    return { error: err instanceof Error ? err.message : 'Invalid credentials' };
  }
}
