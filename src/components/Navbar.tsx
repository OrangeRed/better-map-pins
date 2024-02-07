import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { nextAuthOptions } from '@/lib/auth'
import { getSources } from '@/server/actions'

import { GitHubLogoIcon, HamburgerMenuIcon, PersonIcon } from '@radix-ui/react-icons'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import UserAvatar from './UserAvatar'
import LinksSheet from './LinksSheet'

export default async function Navbar() {
	const session = await getServerSession(nextAuthOptions)
	const sources = await getSources(session?.user?.id)

	return (
		<header className="absolute z-[1000] grid w-full grid-cols-3 border-b-2 border-b-orange-700 bg-[#222222]/60 p-2 backdrop-blur-sm">
			<LinksSheet sources={sources}>
				<Button
					size="icon"
					variant="ghost"
					className="bg-transparent hover:bg-black hover:opacity-80"
				>
					<HamburgerMenuIcon className="scale-150 text-slate-100 " />
				</Button>
			</LinksSheet>
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
