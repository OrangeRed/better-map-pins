'use client'

import { cn, useContext } from '@/lib/utils'
import { ThemeContext } from '@/components/maps/LeafletMap'

import { Toggle } from '@/components/ui/Toggle'
import { SunIcon, MoonIcon } from '@radix-ui/react-icons'

// Classes used by Leaflet to position controls
const POSITION_CLASSES = {
	bottomleft: 'leaflet-bottom leaflet-left',
	bottomright: 'leaflet-bottom leaflet-right',
	topleft: 'leaflet-top leaflet-left',
	topright: 'leaflet-top leaflet-right'
} as const

function ThemeSwitch({ position = 'bottomleft' }: { position?: keyof typeof POSITION_CLASSES }) {
	const { theme, setTheme } = useContext(ThemeContext)

	return (
		<div className={POSITION_CLASSES[position]}>
			<div className="leaflet-control leaflet-bar !border-none">
				<Toggle
					aria-label="Toggle between light mode and dark mode"
					className={cn(
						'h-11 w-12 [&>svg]:scale-150',
						theme === 'cartoDark' && 'bg-white text-black ring-offset-black',
						theme === 'cartoLight' && 'data-[state=on]:bg-black data-[state=on]:text-white'
					)}
					onClick={() => {
						setTheme((prevTheme) => (prevTheme === 'cartoDark' ? 'cartoLight' : 'cartoDark'))
					}}
				>
					{theme === 'cartoDark' ? <SunIcon /> : <MoonIcon />}
				</Toggle>
			</div>
		</div>
	)
}

export default ThemeSwitch
