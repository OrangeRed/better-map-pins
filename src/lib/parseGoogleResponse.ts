type Results = {
	name?: string | null
	address?: string | null
	description?: string[] | null
	price?: string | null
	rating?: number | null
	reviews?: string | null
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
		const name = entry[11] as Results['name']
		const address = entry[18] as Results['address']
		const description = entry[13] as Results['description']
		const price = Array.isArray(entry[4]) ? (entry[4][2] as Results['price']) : null
		const rating = Array.isArray(entry[4]) ? (entry[4][7] as Results['rating']) : null
		const reviews = Array.isArray(entry[4]) ? (entry[4][8] as Results['reviews']) : null
		const coords = Array.isArray(entry[9])
			? ([entry[9][2], entry[9][3]] as Results['coords'])
			: null

		return {
			name,
			coords,
			address,
			description,
			price,
			rating,
			reviews
		} satisfies Results
	})

	// return locations
	return locations.slice(0, 3)
}

export default parseGoogleResponse

export type GoogleResponse = ReturnType<typeof parseGoogleResponse>
