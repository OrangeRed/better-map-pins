'use server'

import { db } from '@/db'
import { sources, sourcesToUsers, users, usersRelation } from '@/db/schemas'
import { nextAuthOptions } from '@/lib/auth'
import { InferInsertModel, and, eq } from 'drizzle-orm'
import { getServerSession } from 'next-auth'

export async function addSource(displayUrl: string) {
	const session = await getServerSession(nextAuthOptions)
	// const link = await db.query.googleLinks.findFirst({
	// 	where: eq(googleLinks.sourceUrl, displayUrl)
	// })

	const test = await db
		.select()
		.from(sourcesToUsers)
		.leftJoin(sources, eq(sourcesToUsers.sourceUrl, sources.sourceUrl))
		.leftJoin(users, eq(sourcesToUsers.userId, session!.user!.id!))

	if (session?.user?.id) {
		const link = await db.query.sources.findFirst({
			where: and(eq(sources.sourceUrl, session.user.id), eq(sources.sourceUrl, displayUrl))
		})

		// if (!link) {
		// 	await db.insert()
		// }
	}

	//
	if (session?.user) {
		const source = {
			sourceUrl: displayUrl,
			queryUrl: ''
		} satisfies InferInsertModel<typeof sources>

		await db.insert(sources).values(source)
	}
}
