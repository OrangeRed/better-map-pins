import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from './Avatar'
import { Button } from './Button'
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger
} from '@/components/ui/Sheet'
import { GitHubLogoIcon, HamburgerMenuIcon } from '@radix-ui/react-icons'
import { cn } from '@/lib/utils'

function SheetDemo() {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button size="icon" variant="ghost">
					<HamburgerMenuIcon className="scale-150 dark:text-slate-100" />
				</Button>
			</SheetTrigger>
			<SheetContent className="z-[1000]" side="left">
				<SheetHeader>
					<SheetTitle>Edit profile</SheetTitle>
					<SheetDescription>
						{"Make changes to your profile here. Click save when you're done."}
					</SheetDescription>
				</SheetHeader>
				<div className="grid gap-4 py-4">
					{/* <div className="grid grid-cols-4 items-center gap-4">
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
					</div> */}
				</div>
				<SheetFooter>
					<SheetClose asChild>
						<Button type="submit">Save changes</Button>
					</SheetClose>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	)
}

function Navbar() {
	return (
		<header className="dark absolute z-[1000] grid w-full grid-cols-3 border-b-2 border-b-orange-700 bg-[#222222] bg-opacity-60 p-2 backdrop-blur-sm">
			<SheetDemo />
			<p className="self-center text-center text-slate-100">Better Map Pins</p>
			<div className="flex justify-end gap-x-4">
				<Button asChild className="rounded-full" size="icon" variant="ghost">
					<Link href="https://github.com/OrangeRed" target="_blank">
						<GitHubLogoIcon className="h-full w-full text-slate-100 transition-colors hover:text-orange-400 dark:text-slate-100 dark:hover:text-orange-400" />
					</Link>
				</Button>
				<Button
					size="icon"
					variant="ghost"
					className="rounded-full transition-opacity hover:opacity-80"
				>
					<Avatar>
						<AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
						<AvatarFallback className="dark:bg-slate-100">CN</AvatarFallback>
					</Avatar>
				</Button>
			</div>
		</header>
	)
}

export default Navbar
