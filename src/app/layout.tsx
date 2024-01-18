import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { cn } from '@/lib/utils'

import 'leaflet/dist/leaflet.css'
import './globals.css'
import Navbar from '@/components/ui/Navbar'

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
			<body className={cn('flex h-screen w-screen flex-col', inter.className)}>
				<Navbar />
				{children}
			</body>
		</html>
	)
}
