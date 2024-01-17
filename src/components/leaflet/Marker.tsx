'use client'

import { ReactElement, useEffect, useRef, useState } from 'react'
import L, { type LatLngTuple } from 'leaflet'
import { Marker, MarkerProps } from 'react-leaflet'

import { cn } from '@/lib/utils'

type CustomMarkerProps = {
	name?: string | null // TODO Add real data
	position: LatLngTuple
	icon: MarkerProps['icon'] | ReactElement
} & Omit<MarkerProps, 'icon' | 'position'>

function CustomMarker({ name, position, icon: _icon, children, ...props }: CustomMarkerProps) {
	const iconRef = useRef<HTMLAnchorElement | null>(null)
	const [icon, setIcon] = useState(_icon)

	const markerRef = useRef<L.Marker | null>(null)

	useEffect(() => {
		if (iconRef.current === null) return

		const label = iconRef.current.lastElementChild
		const offset = label ? label.scrollWidth - 24 : 0

		const divIcon = L.divIcon({
			className: cn('map-marker [&>*]:opacity-100'),
			html: iconRef.current,
			iconSize: L.point(24, 24),
			popupAnchor: L.point(offset / 2, -12)
		})

		setIcon(divIcon)
	}, [iconRef])

	// Render jsx icon to grab the reference to its html
	if (icon && !(icon instanceof L.DivIcon) && !(icon instanceof L.Icon)) {
		return (
			<a
				ref={iconRef}
				className="relative flex items-center rounded-full opacity-0"
				href={`https://www.google.com/maps/search/?api=1&query=${
					name?.replaceAll(' ', '+') ?? position.join(',')
				}`}
				target="_blank"
			>
				<>
					{icon}
					<span className="absolute left-0 whitespace-nowrap pl-7 text-base font-semibold text-orange-400">
						{name}
					</span>
					{/* // TODO Switch directions when the label overlaps another node */}
					{/* <span className="absolute right-0 pr-7 whitespace-nowrap text-base font-semibold text-orange-400">
						{name}
					</span> */}
				</>
			</a>
		)
	}

	return (
		<Marker
			ref={markerRef}
			position={position}
			icon={icon}
			eventHandlers={{
				mouseover: (e) => {
					if (markerRef.current === null) return

					markerRef.current.openPopup(e.latlng)
				},
				mouseout: () => {
					if (markerRef.current === null) return

					markerRef.current.closePopup()
				}
			}}
			{...props}
		>
			{children}
		</Marker>
	)
}

export default CustomMarker
