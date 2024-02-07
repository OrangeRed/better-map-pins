'use server'

import { db } from '@/db'
import { mapPins, sources } from '@/db/schemas'
import { eq, type InferInsertModel } from 'drizzle-orm'

import { randomUUID } from 'crypto'
import parseGoogleResponse from '@/lib/parseGoogleResponse'

const USER_ID = '1b41a6e3-0d2a-460f-895c-5af74189f659'

/**
 * Fetch pins from google maps search query and import them to db
 * @param queryUrl - Google maps search query url
 */
export async function importPins(queryUrl: string) {
	const [links, ...rest] = await db.select().from(sources).where(eq(sources.userId, USER_ID))

	const text = await fetch(links.queryUrl).then((data) => data.text())

	// TODO fetch more than 20
	// const text = await fetch(queryUrl).then((data) => data.text())
	const data = parseGoogleResponse(text)

	const hasCoords = data
		.map((location) => {
			if (!location.coords) return

			return {
				sourceId: links.id,
				name: location.name,
				address: location.address,
				price: location.price,
				rating: location.rating,
				coords: {
					lat: location.coords[0],
					long: location.coords[1]
				}
			} satisfies InferInsertModel<typeof mapPins>
		})
		.filter((location): location is NonNullable<typeof location> => !!location)

	console.log(hasCoords[0], links)
	console.log(`data: ${data.length} hasCoords: ${hasCoords.length}`)
	// await db.insert(mapPins).values(hasCoords)
}
