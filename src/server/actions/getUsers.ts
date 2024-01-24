'use server'

import { db } from '@/db'
import { users } from '@/db/schemas'

export async function getUsers() {
	const result = await db.select().from(users).all()

	return result
}
