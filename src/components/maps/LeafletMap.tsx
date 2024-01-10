'use client'

import { type LatLngTuple } from 'leaflet'
import { MapContainer, Popup, TileLayer } from 'react-leaflet'
import Cluster from 'react-leaflet-cluster'
import Marker from '@/components/leaflet/Marker'

import { FaCoffee } from 'react-icons/fa'

import { type GoogleResponse } from '@/lib/parseGoogleResponse'

const INITIAL_VIEW: LatLngTuple = [40.7026493, -73.991899] // Dumbo
const INITIAL_ZOOM = 12

type LeafletMapProps = {
	initialView?: LatLngTuple
	initialZoom?: number
	locations: GoogleResponse
}

function LeafletMap({
	initialView = INITIAL_VIEW,
	initialZoom = INITIAL_ZOOM,
	locations
}: LeafletMapProps) {
	return (
		<MapContainer
			className="h-full w-full bg-[#222222]"
			center={initialView}
			keyboard={false}
			zoom={initialZoom}
		>
			<TileLayer
				url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
				attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				minZoom={0}
				maxZoom={20}
			/>

			<Cluster
				// iconCreateFunction={}
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
										<FaCoffee className="fill-white" />
									</div>
								}
							>
								<Popup>{location.name ?? ''}</Popup>
							</Marker>
						)
					}
				})}
			</Cluster>
		</MapContainer>
	)
}

export default LeafletMap
