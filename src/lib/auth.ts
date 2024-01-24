import { type NextAuthOptions } from 'next-auth'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import { db } from '@/db'

import GoogleProvider from 'next-auth/providers/google'

export const nextAuthOptions = {
	// '@auth/*-adapter' and 'next-auth/adapter' have incompatible types
	adapter: DrizzleAdapter(db) as NextAuthOptions['adapter'],
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!
		})
	]
} satisfies NextAuthOptions
