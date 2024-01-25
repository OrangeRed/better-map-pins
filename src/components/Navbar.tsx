import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { nextAuthOptions } from '@/lib/auth'

import { GitHubLogoIcon, HamburgerMenuIcon, PersonIcon } from '@radix-ui/react-icons'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger
} from './ui/sheet'
import UserAvatar from './UserAvatar'

function SheetDemo() {
	return (
		<Sheet>
			<SheetTrigger asChild className="hover:bg-black">
				<Button size="icon" variant="ghost">
					<HamburgerMenuIcon className="scale-150 text-slate-100 " />
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

export default async function Navbar() {
	const session = await getServerSession(nextAuthOptions)

	return (
		<header className="absolute z-[1000] grid w-full grid-cols-3 border-b-2 border-b-orange-700 bg-[#222222]/60 p-2 backdrop-blur-sm">
			<SheetDemo />
			<p className="self-center text-center text-slate-100">Better Map Pins</p>
			<div className="flex justify-end gap-x-4">
				<Button
					asChild
					size="icon"
					variant="ghost"
					title="https://github.com/OrangeRed"
					className="rounded-full text-slate-100 transition-colors hover:bg-black hover:text-orange-500"
				>
					<Link href="https://github.com/OrangeRed" target="_blank">
						<GitHubLogoIcon className="h-full w-full" />
					</Link>
				</Button>

				<UserAvatar>
					<Avatar className="transition-opacity hover:opacity-80">
						{session?.user ? (
							<>
								<AvatarImage src={session.user.image ?? ''} referrerPolicy="no-referrer" />
								<AvatarFallback className="bg-transparent text-slate-100">
									{session.user.email?.slice(0, 2).toUpperCase()}
								</AvatarFallback>
							</>
						) : (
							<PersonIcon className="m-auto h-3/5 w-3/5 self-center text-slate-100" />
						)}
					</Avatar>
				</UserAvatar>
			</div>
		</header>
	)
}
