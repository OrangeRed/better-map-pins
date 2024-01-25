'use client'

import { type ReactNode, useState } from 'react'
import { signOut, useSession } from 'next-auth/react'

import { Button } from './ui/button'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Dialog, DialogTrigger } from './ui/dialog'
import SigninDialog from './auth/SigninDialog'

export default function UserAvatar({ children }: { children: ReactNode }) {
	const { data: session, status } = useSession()

	const [open, setOpen] = useState(false)

	if (status === 'unauthenticated') {
		return (
			<Dialog>
				<DialogTrigger asChild>
					<Button
						size="icon"
						variant="ghost"
						className="rounded-full bg-transparent hover:bg-black"
					>
						{children}
					</Button>
				</DialogTrigger>

				<SigninDialog />
			</Dialog>
		)
	}

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					size="icon"
					variant="ghost"
					className="rounded-full bg-transparent hover:bg-black"
					onMouseEnter={() => setOpen(true)}
				>
					{children}
				</Button>
			</PopoverTrigger>

			<PopoverContent className=" z-[1000] mr-1 mt-2 flex flex-col gap-y-2 bg-[#222222]/60 backdrop-blur-sm">
				{/* // TODO display current user better */}
				<p className="text-center text-lg text-white">{session?.user?.email ?? ''}</p>
				<Button
					variant="outline"
					className="text-lg transition-opacity hover:opacity-80"
					onClick={() => signOut()}
				>
					Sign out
				</Button>
			</PopoverContent>
		</Popover>
	)
}
