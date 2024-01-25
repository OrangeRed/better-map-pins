'use client'

import { signIn } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogClose,
	DialogPortal,
	DialogOverlay
} from '@/components/ui/dialog'
import Image from 'next/image'

export default function SigninDialog() {
	return (
		<DialogContent className="max-w-sm bg-[#222222]/90 text-white backdrop-blur-sm">
			<DialogHeader>
				<DialogTitle className="text-center">Sign in</DialogTitle>
				{/* <DialogDescription>
					{"Make changes to your profile here. Click save when you're done."}
				</DialogDescription> */}
			</DialogHeader>
			<div className="grid gap-4 py-4">
				<div className="grid grid-cols-4 items-center gap-4">
					<label htmlFor="name" className="text-right">
						Name
					</label>
					<input id="name" value="Pedro Duarte" className="col-span-3" />
				</div>
				<div className="grid grid-cols-4 items-center gap-4">
					<label htmlFor="username" className="text-right">
						Username
					</label>
					<input id="username" value="@peduarte" className="col-span-3" />
				</div>
			</div>

			<hr></hr>

			<Button
				variant="outline"
				className="gap-x-4 bg-white text-lg  text-black hover:bg-opacity-80 dark:bg-white dark:text-black dark:hover:bg-opacity-80"
				onClick={() => signIn('google', { redirect: true })}
			>
				<Image
					alt="Google"
					loading="lazy"
					height="24"
					width="24"
					src="https://authjs.dev/img/providers/google.svg"
				/>
				Sign in with Google
			</Button>

			{/* <DialogFooter>
				<Button type="submit">Save changes</Button>
			</DialogFooter> */}
		</DialogContent>
	)
}
