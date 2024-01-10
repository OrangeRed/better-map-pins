'use client'

import { useContext, useEffect, useRef, useState } from 'react'
import { LeafletMapContext } from './Map'

import L, { type LatLngTuple } from 'leaflet'

import { FaFlag } from 'react-icons/fa'

import cn from '@/lib/cn'

type LeafletMarkerProps = {
	latLng: LatLngTuple
	name?: string | null
} & React.AnchorHTMLAttributes<HTMLAnchorElement>

const query = 'Dumbo'

function Marker({ latLng, name, className, ...props }: LeafletMarkerProps) {
	const mapCtx = useContext(LeafletMapContext)

	const markerElementRef = useRef<HTMLAnchorElement | null>(null)
	const [marker, setMarker] = useState<L.Marker | null>(null)

	useEffect(() => {
		if (!mapCtx) return
		if (markerElementRef.current === null) return

		const map = mapCtx.map

		const icon = L.divIcon({
			className: cn('map-marker'),
			html: markerElementRef.current,
			iconSize: L.point(28, 28),
			popupAnchor: L.point(0, -12)
		})

		const markerRef = L.marker(latLng, { icon, keyboard: false }).addTo(map)

		setMarker(markerRef)
		mapCtx.setMap(map)

		return () => {
			markerRef.remove()
		}
	}, [markerElementRef, mapCtx, latLng])

	return (
		<a
			ref={markerElementRef}
			className={cn('relative flex h-full w-full items-center rounded-full', className ?? '')}
			href={`https://www.google.com/maps/search/?api=1&query=${query ?? latLng.join(',')}`}
			target="_blank"
			{...props}
		>
			{marker && (
				// TODO Switch to a different way of rendering svgs to handle dynamic changes
				<>
					<FaFlag className="h-full w-full rounded-full border-2 border-white bg-green-600 fill-white p-1 shadow shadow-black" />
					<span className="absolute ml-8 whitespace-nowrap text-base font-semibold text-green-600">
						{name ?? latLng.join(' ')}
					</span>
				</>
			)}
		</a>
	)
}

export default Marker
