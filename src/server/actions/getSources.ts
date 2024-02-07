'use server'

import { db } from '@/db'
import { sources } from '@/db/schemas'
import { eq } from 'drizzle-orm'

export async function getSources(userId?: string) {
	if (!userId) {
		return null
	}

	const data = await db
		.select({
			sourceId: sources.id,
			displayUrl: sources.sourceUrl
		})
		.from(sources)
		.where(eq(sources.userId, userId))

	return data
}
