import { getServerSession } from 'next-auth'
import { nextAuthOptions } from '@/lib/auth'

import Link from 'next/link'
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
} from '@/components/ui/sheet'
import { HoverCard, HoverCardContent, HoverCardTrigger } from './ui/hover-card'
import { GitHubLogoIcon, HamburgerMenuIcon, PersonIcon } from '@radix-ui/react-icons'
import SignoutButton from './auth/SignoutButton'
import { SigninDialog } from './auth/SigninDialog'

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

	console.log(session?.user)

	return (
		<header className="absolute z-[1000] grid w-full grid-cols-3 border-b-2 border-b-orange-700 bg-[#222222] bg-opacity-60 p-2 backdrop-blur-sm">
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

				<HoverCard openDelay={0}>
					<HoverCardTrigger asChild>
						<Button
							size="icon"
							variant="ghost"
							className="rounded-full bg-transparent hover:bg-black"
						>
							<Avatar className="transition-opacity hover:opacity-80">
								{session?.user ? (
									<>
										<AvatarImage src={session.user.image ?? ''} referrerPolicy="no-referrer" />
										<AvatarFallback className="bg-transparent text-slate-100">
											{session.user.name?.slice(0, 2)}
										</AvatarFallback>
									</>
								) : (
									<PersonIcon className="m-auto h-3/5 w-3/5 self-center text-slate-100" />
								)}
							</Avatar>
						</Button>
					</HoverCardTrigger>
					<HoverCardContent className="mr-1 mt-2.5 flex flex-col gap-y-2">
						{session?.user ? (
							<>
								<p className="text-center">{session.user.email}</p>
								<SignoutButton />
							</>
						) : (
							<SigninDialog />
							// <Button asChild>
							// 	<Link href="api/auth/signin">Sign in</Link>
							// </Button>
						)}
					</HoverCardContent>
				</HoverCard>
			</div>
		</header>
	)
}
