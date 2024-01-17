import { TileLayer, TileLayerProps, useMap } from 'react-leaflet'

// Other providers: https://leaflet-extras.github.io/leaflet-providers/preview/
export const TILE_PROVIDERS = {
	cartoDark: {
		url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
		minZoom: 0,
		maxZoom: 20,
		attribution:
			'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
	},
	cartoLight: {
		url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
		minZoom: 0,
		maxZoom: 20,
		attribution:
			'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
	},
	stadiaDark: {
		url: 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png',
		minZoom: 0,
		maxZoom: 20,
		attribution:
			'&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	},
	stadiaLight: {
		url: 'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png',
		minZoom: 0,
		maxZoom: 20,
		attribution:
			'&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	}
} satisfies Record<string, TileLayerProps>

export type TileProviders = keyof typeof TILE_PROVIDERS

function Tiles({ provider }: { provider: TileProviders }) {
	return <TileLayer {...TILE_PROVIDERS[provider]} />
}

export default Tiles
