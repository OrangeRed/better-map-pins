'use client'

import L, { type LatLngTuple } from 'leaflet'
import { useEffect, useState } from 'react'

import Map from '@/components/leaflet/Map'
import Marker from '@/components/leaflet/Marker'
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
	const [provider, setProvider] = useState<L.TileLayer | null>(null)

	useEffect(() => {
		const tileSet = L.tileLayer(
			// View other providers here: https://leaflet-extras.github.io/leaflet-providers/preview/
			'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png',
			{
				minZoom: 0,
				maxZoom: 20,
				attribution:
					'&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			}
		)

		setProvider(tileSet)

		return () => {
			tileSet.remove()
		}
	}, [])

	if (!provider) {
		return null
	}

	// TODO Create a clusters components / figure out how it works
	return (
		<Map initialView={initialView} initialZoom={initialZoom} provider={provider}>
			{locations.map((location, idx) => {
				if (location.coords) {
					return <Marker key={`marker-${idx}`} latLng={location.coords} name={location.name} />
				}
			})}
		</Map>
	)
}

export default LeafletMap
