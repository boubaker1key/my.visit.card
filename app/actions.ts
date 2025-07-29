'use server';
import { signIn } from 'next-auth/react';
import { redirect } from 'next/navigation';

export async function loginAction(formData: FormData) {
  try {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      // إرجاع الخطأ مع رمز الحالة
      return { 
        error: result.error,
        status: 'error'
      };
    }

    // التوجيه بعد التحقق من النجاح
    if (result?.url) {
      redirect(result.url); // أو redirect('/protected') مباشرة
    } else {
      redirect('/protected'); // خطوة احتياطية
    }

  } catch (err) {
    // معالجة الأخطاء غير المتوقعة
    return {
      error: err instanceof Error ? err.message : 'An unexpected error occurred',
      status: 'error'
    };
  }
}
