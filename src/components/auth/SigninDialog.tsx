'use client'

import { useState } from 'react'
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
import { cn } from '@/lib/utils'
// import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'

export function SigninDialog() {
	const [open, setOpen] = useState(false)

	return (
		<Dialog open={open}>
			<DialogTrigger asChild>
				<Button variant="outline" onClick={() => setOpen((prev) => !prev)}>
					Edit Profile
				</Button>
			</DialogTrigger>

			<DialogPortal>
				<DialogOverlay />
				<div
					className={cn(
						'fixed left-[50%] top-[50%] z-[1010] grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-slate-200 bg-white p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] dark:border-slate-800 dark:bg-slate-950 sm:rounded-lg'
					)}
				>
					<DialogHeader>
						<DialogTitle>Edit profile</DialogTitle>
						<DialogDescription>
							{"Make changes to your profile here. Click save when you're done."}
						</DialogDescription>
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
					<DialogFooter>
						<Button type="submit">Save changes</Button>
					</DialogFooter>
				</div>
			</DialogPortal>

			{/* <DialogContent className="data-active:w-full z-[1000] bg-opacity-70 backdrop-blur-sm"></DialogContent> */}
		</Dialog>
	)
}
