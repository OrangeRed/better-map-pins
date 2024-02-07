export type Result = {
	name?: string | null
	address?: string | null
	description?: string[] | null
	price?: string | null
	rating?: number | null
	noReviews?: number | null
	coords: [number, number] | null
}

function parseGoogleResponse(rawInput: string) {
	// Remove starting / ending unparseable characters from raw response
	const preparedForParsing = rawInput.replace('/*""*/', '').replace(")]}'\\n", '')
	const d: string | undefined = JSON.parse(preparedForParsing)['d']

	if (!d) {
		throw new Error('data is not defined')
	}

	// TODO Clean up data extraction with better types
	const data: unknown[][] = JSON.parse(d)[0][1].map((array: unknown[]) => array[14])

	const locations = data.map((entry, idx) => {
		const name = entry[11] as Result['name']
		const address = entry[18] as Result['address']
		const description = entry[13] as Result['description']
		const price = Array.isArray(entry[4]) ? (entry[4][2] as Result['price']) : null
		const rating = Array.isArray(entry[4]) ? (entry[4][7] as Result['rating']) : null
		const noReviews = Array.isArray(entry[4]) ? (entry[4][8] as Result['noReviews']) : null
		const coords = Array.isArray(entry[9]) ? ([entry[9][2], entry[9][3]] as Result['coords']) : null

		return {
			name,
			coords,
			address,
			description,
			price,
			rating,
			noReviews
		} satisfies Result
	})

	return locations
}

export default parseGoogleResponse

export type GoogleResponse = ReturnType<typeof parseGoogleResponse>
