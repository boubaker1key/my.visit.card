import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { compare } from 'bcrypt-ts';
import { getUser } from 'app/db';
import { authConfig } from 'app/auth.config';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
async authorize({ email, password }: any) {
  try {
    console.log('Attempting login for:', email); // Debug
    const user = await getUser(email);
    console.log('User found:', user); // Debug

    if (!user || user.length === 0) {
      console.log('No user found'); // Debug
      return null;
    }

    const passwordsMatch = await compare(password, user[0].password!);
    console.log('Password match:', passwordsMatch); // Debug

    return passwordsMatch ? user[0] : null;
  } catch (error) {
    console.error('Authentication error:', error); // Debug
    throw error; // Important for debugging
  }
},
    }),
  ],
});



