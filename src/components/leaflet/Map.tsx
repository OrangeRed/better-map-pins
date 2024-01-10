'use client'

import { createContext, useEffect, useRef, useState } from 'react'
import L, { type LatLngTuple } from 'leaflet'

import cn from '@/lib/cn'

type LeafletMapContextType = {
	map: L.Map
	setMap: (map: L.Map) => void
}

export const LeafletMapContext = createContext<LeafletMapContextType | null>(null)

type LeafletMapProps = {
	initialView: LatLngTuple
	initialZoom: number
	provider: L.TileLayer
} & React.HTMLAttributes<HTMLDivElement>

function LeafletMap({
	initialView,
	initialZoom,
	provider,
	children,
	className,
	...props
}: LeafletMapProps) {
	const mapElementRef = useRef<HTMLDivElement | null>(null)
	const [map, setMap] = useState<L.Map | null>(null)

	// Init Map
	useEffect(() => {
		if (typeof window === undefined) return
		if (mapElementRef.current === null) return

		const mapRef = L.map(mapElementRef.current).setView(initialView, initialZoom)

		provider.addTo(mapRef)

		setMap(mapRef)

		return () => {
			mapRef.remove()
		}
	}, [mapElementRef, initialView, initialZoom, provider])

	return (
		<div
			ref={mapElementRef}
			className={cn('h-full w-full bg-[#222222]', className ?? '')}
			{...props}
		>
			{map && (
				<LeafletMapContext.Provider value={{ map, setMap }}>{children}</LeafletMapContext.Provider>
			)}
		</div>
	)
}

export default LeafletMap
