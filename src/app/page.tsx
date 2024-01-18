import dynamic from 'next/dynamic'
import { useMemo } from 'react'

import fs from 'fs'
import parseGoogleResponse from '@/lib/parseGoogleResponse'

export default async function Home() {
	const LeafletMap = useMemo(
		() =>
			dynamic(() => import('@/components/maps/LeafletMap'), {
				loading: () => <MapLoading />,
				ssr: false
			}),
		[]
	)

	const file = fs.readFileSync('./public/f.txt').toString()
	const data = parseGoogleResponse(file)

	return (
		<main className="h-full w-full">
			<LeafletMap locations={data} />
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
