'use client'

import React from 'react'
import * as TogglePrimitive from '@radix-ui/react-toggle'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const toggleVariants = cva(
	cn(
		'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors transition-opacity',
		// 'hover:bg-muted hover:text-muted-foreground',
		'hover:opacity-90',
		'disabled:pointer-events-none disabled:opacity-50',
		'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-100 focus-visible:ring-offset-2',
		'data-[state=on]:bg-slate-100 data-[state=on]:text-slate-900 data-[state=on]:ring-slate-800 data-[state=on]:hover:opacity-70',
		'dark:ring-offset-slate-950 dark:hover:bg-slate-800 dark:hover:text-slate-400 dark:focus-visible:ring-slate-300',
		'dark:data-[state=on]:bg-slate-800 dark:data-[state=on]:text-slate-50'
	),
	{
		variants: {
			variant: {
				default: 'bg-transparent',
				outline: 'border border-input bg-transparent hover:bg-accent hover:text-accent-foreground'
			},
			size: {
				default: 'h-10 px-3',
				sm: 'h-9 px-2.5',
				lg: 'h-11 px-5'
			}
		},
		defaultVariants: {
			variant: 'default',
			size: 'default'
		}
	}
)

const Toggle = React.forwardRef<
	React.ElementRef<typeof TogglePrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> & VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
	<TogglePrimitive.Root
		ref={ref}
		className={cn(toggleVariants({ variant, size, className }))}
		{...props}
	/>
))

Toggle.displayName = TogglePrimitive.Root.displayName

export { Toggle, toggleVariants }
