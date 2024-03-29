import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

import type { Config } from 'drizzle-kit'

export default {
	schema: './src/db/schemas/index.ts',
	out: './drizzle',
	driver: 'libsql',
	dbCredentials: {
		url: process.env.DATABASE_URL!
	}
} satisfies Config
