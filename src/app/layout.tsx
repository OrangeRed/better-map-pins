import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { cn } from '@/lib/utils'

import NextAuthProvider from '@/components/auth/AuthProvider'
import Navbar from '@/components/Navbar'

import './globals.css'
import 'leaflet/dist/leaflet.css'

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
				<NextAuthProvider>
					<Navbar />
					{children}
				</NextAuthProvider>
			</body>
		</html>
	)
}
