import { useMemo } from 'react'

import dynamic from 'next/dynamic'
import { getServerSession } from 'next-auth'
import { nextAuthOptions } from '@/lib/auth'
import parseGoogleResponse from '@/lib/parseGoogleResponse'

async function fetchGooglePins() {
	const TEST_QUERY =
		process.env.NODE_ENV === 'production' ? undefined : process.env.GOOGLE_MAPS_TEST_QUERY!

	if (!TEST_QUERY) return

	return fetch(TEST_QUERY)
		.then((data) => data.text())
		.then((text) => parseGoogleResponse(text))
		.catch((e) => console.error(e))
}

export default async function Home() {
	const LeafletMap = useMemo(
		() =>
			dynamic(() => import('@/components/maps/LeafletMap'), {
				loading: () => <MapLoading />,
				ssr: false
			}),
		[]
	)

	const session = await getServerSession(nextAuthOptions)

	const locations = (await fetchGooglePins()) ?? []

	return (
		<main className="h-full w-full">
			<LeafletMap locations={locations} />
		</main>
	)
}

function MapLoading() {
	return (
		<p className="flex h-full items-center justify-center bg-[#222222] text-3xl text-slate-200">
			Map is loading...
		</p>
	)
}
