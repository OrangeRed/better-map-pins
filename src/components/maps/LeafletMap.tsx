'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { createContext } from '@/lib/hooks'

import { type LatLngTuple } from 'leaflet'
import { MapContainer, Popup, ZoomControl } from 'react-leaflet'
import Cluster from 'react-leaflet-cluster'
import Marker from '@/components/leaflet/Marker'
import ThemeSwitch from '@/components/leaflet/ThemeSwitch'
import TileProvider, { type TileProviders } from '@/components/leaflet/TileProvider'

import { FaCoffee } from 'react-icons/fa'

import { type GoogleResponse } from '@/lib/parseGoogleResponse'

export const ThemeContext = createContext<ReturnType<typeof ContextState>>()

const ContextState = () => {
	const [theme, setTheme] = useState<TileProviders>('cartoDark')
	return { theme, setTheme }
}

type LeafletMapProps = {
	initialView?: LatLngTuple
	initialZoom?: number
	locations: GoogleResponse
}

function LeafletMap({
	initialView = [40.7026493, -73.991899], // Dumbo
	initialZoom = 12,
	locations
}: LeafletMapProps) {
	const { theme, setTheme } = ContextState()

	return (
		<ThemeContext.Provider value={{ theme, setTheme }}>
			<div
				className={cn(
					'h-full w-full',
					theme === 'cartoDark' && '[&>.leaflet-container]:bg-[#222222]'
				)}
			>
				<MapContainer
					className="h-full w-full"
					center={initialView}
					zoom={initialZoom}
					attributionControl={false}
					keyboard={false}
					zoomControl={false}
				>
					<TileProvider provider={theme} />

					<ZoomControl position="bottomright" />
					<ThemeSwitch position="bottomleft" />

					<Cluster
						// iconCreateFunction={}
						animate
						chunkedLoading
						maxClusterRadius={60}
						showCoverageOnHover={false}
						removeOutsideVisibleBounds
					>
						{locations.map((location, idx) => {
							if (location.coords) {
								return (
									<Marker
										key={`marker-${idx}`}
										name={location.name}
										position={location.coords}
										keyboard={false}
										riseOnHover
										// TODO Switch to a different way of rendering icon to handle dynamic changes
										icon={
											<div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-blue-800 shadow shadow-black">
												<FaCoffee className="fill-white"></FaCoffee>
											</div>
										}
									>
										<Popup>{location.name ?? ''}'s additional content information</Popup>
									</Marker>
								)
							}
						})}
					</Cluster>
				</MapContainer>
			</div>
		</ThemeContext.Provider>
	)
}

export default LeafletMap
