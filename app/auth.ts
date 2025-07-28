
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
        let user = await getUser(email);
        if (!user || user.length === 0) throw new Error('user');
        let passwordsMatch = await compare(password, user[0].password!);
        if (!passwordsMatch) throw new Error('pass');
          return user[0] as any;
      },
    }),
  ],
});

/*********************************************************/
