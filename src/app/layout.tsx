import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import cn from '@/lib/cn'

import 'leaflet/dist/leaflet.css'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Next Maps',
	description: 'Making maps using leaflet in nextjs',
	icons: [
		{
			url: './favicon.svg'
		}
	]
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={cn('h-screen w-screen', inter.className)}>{children}</body>
		</html>
	)
}
