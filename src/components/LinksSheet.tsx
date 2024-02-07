import { type ReactNode } from 'react'

import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger
} from './ui/sheet'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { importPins } from '@/server/actions/insertPins'
import { addSource } from '@/server/actions/addSource'

function LinksSheet({
	sources,
	children
}: {
	sources: Array<{ displayUrl: string; sourceId: string }> | null
	children: ReactNode
}) {
	// save current links in state / RTK

	// Sync pins from links
	// Adding a link triggers sync

	async function handleSumbit(formData: FormData) {
		'use server'

		const url = formData.get('url')
		if (url && typeof url === 'string') {
			await addSource(url)
		}
	}

	return (
		<Sheet>
			<SheetTrigger asChild>{children}</SheetTrigger>
			<SheetContent className="z-[1000] border-0 bg-[#222222] text-white" side="left">
				<SheetHeader className="items-center ">
					<SheetTitle className="text-white">Sources</SheetTitle>
					<SheetDescription className="text-white/80">
						{'Add, remove or hide current map pin sources'}
					</SheetDescription>
				</SheetHeader>
				<div className="grid gap-4 border-2 border-orange-400 py-4">
					{sources?.map(({ displayUrl, sourceId }) => {
						return <div key={sourceId}>{displayUrl}</div>
					})}
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
				<hr className="my-4 text-white/60" />

				{/* // TODO create adder fn */}
				<SheetFooter>
					<form
						className="grid w-full items-center gap-4 border-2 border-red-200 p-2"
						method="POST"
						action={handleSumbit}
					>
						<div className="flex flex-col space-y-1.5">
							<Label htmlFor="url">URL</Label>
							<Input
								id="url"
								name="url"
								className="text-black"
								placeholder="Shareable link to your google maps list"
							/>
						</div>

						<Button
							type="submit"
							className="bg-white text-black transition-opacity  hover:bg-white hover:opacity-80"
						>
							Save changes
						</Button>
					</form>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	)
}

export default LinksSheet
